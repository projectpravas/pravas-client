import React, { useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import TourService from "../../../services/TourService";
import { errorToast } from "../../../ui/toast/Toast";
import Packages from "../pravas/packages/Packages";
import PravasList from "./PravasList";

interface IPravasProps {}

const Pravas: React.FunctionComponent<IPravasProps> = (props) => {
  const [tours, setTours] = React.useState<object[]>([{}]);
  const { pathname } = useLocation();
  const showPravas =
    pathname.split("/")[pathname.split("/").length - 1] == "pravas";

  const loadTours = () => {
    TourService.fetchAllTours(
      `?category=${pathname.includes("pravas") ? "package" : "tour"}`
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

  return (
    <div style={{ marginTop: showPravas ? "48px" : "" }}>
      {showPravas && <h2>Pravas Dashboard here</h2>}

      <Outlet />
    </div>
  );
};

export default Pravas;
