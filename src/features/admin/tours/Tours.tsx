import React from "react";
import CustomTourForm from "../../frontend/customtourform/CustomTourForm";

interface IToursProps {}

const Tours: React.FunctionComponent<IToursProps> = (props) => {
  return (
    <>
      {/* <h1>Tours</h1> */}
      {/* <PackageForm /> */}
      <CustomTourForm />
    </>
  );
};

export default Tours;
