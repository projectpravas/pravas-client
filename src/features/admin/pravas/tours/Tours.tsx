import React from "react";
import CustomTourForm from "../../../frontend/customtourform/CustomTourForm";
import TourForm from "../TourAndPackageForm";

interface IToursProps {}

const Tours: React.FunctionComponent<IToursProps> = (props) => {
  return (
    <>
      <CustomTourForm />
    </>
  );
};

export default Tours;
