import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { selectLoggedUser } from "../../../app/slices/AuthSlice";
import TourService from "../../../services/TourService";
import UserModel from "../../../shared/models/userModel";
import { errorToast } from "../../../ui/toast/Toast";

interface IPravasProps {}

const Pravas: React.FunctionComponent<IPravasProps> = (props) => {
  const [tours, setTours] = React.useState<object[]>([{}]);
  const { pathname } = useLocation();
  const showPravas =
    pathname.split("/")[pathname.split("/").length - 1] == "pravas";

  const navPath =
    pathname.split("/")[pathname.split("/").length - 1] == "pravas"
      ? "tours"
      : pathname.split("/")[pathname.split("/").length - 1];

  const navigate = useNavigate();
  const currentLoggedUser: UserModel = useSelector(selectLoggedUser);

  const loadTours = () => {
    TourService.fetchAllTours(
      `?category=${pathname.includes("pravas") ? "package" : "package"}`
    )
      .then((res) => {
        setTours(res?.data?.data);
      })
      .catch((err) => {
        console.error(err);
        const msg = err?.response?.data?.message || "Try Again..";
        errorToast(msg, 5000);
      });
  };

  React.useEffect(() => {
    loadTours();
  }, []);

  useEffect(() => {
    if (showPravas) navigate(`${navPath}`);
  }, [navPath]);
  return (
    <React.Fragment>
      <div style={{ marginTop: showPravas ? "48px" : "" }}>
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default Pravas;
