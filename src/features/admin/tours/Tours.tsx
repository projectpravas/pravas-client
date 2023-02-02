import React from "react";
import PackageForm from "./packageForm";

interface IToursProps {}

const Tours: React.FunctionComponent<IToursProps> = (props) => {
  return (
    <>
      <h1>Tours</h1>
      <PackageForm />
    </>
  );
};

export default Tours;
