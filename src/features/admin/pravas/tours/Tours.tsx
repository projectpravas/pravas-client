import React from "react";
import { useLocation } from "react-router";
import TourService from "../../../../services/TourService";
import { errorToast } from "../../../../ui/toast/Toast";
import CustomTourForm from "../../../frontend/customtourform/CustomTourForm";
import PravasList from "../PravasList";
import TourForm from "../TourAndPackageForm";

interface IToursProps {}

const Tours: React.FunctionComponent<IToursProps> = (props) => {
  const [tours, setTours] = React.useState<object[]>([{}]);

  const { pathname } = useLocation();

  const loadTours = () => {
    TourService.fetchAllTours(`?category=${"tour"}`)
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
    <>
      {/* <CustomTourForm /> */}
      <PravasList
        data={tours}
        loadTours={loadTours}
        title={`${pathname.includes("tours") ? "Tour" : "Package"} List`}
      />
    </>
  );
};

export default Tours;
