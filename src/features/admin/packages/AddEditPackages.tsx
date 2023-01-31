import * as React from "react";
import PackageForm from "./PackageForm";

interface IAddEditPackagesProps {}

const AddEditPackages: React.FunctionComponent<IAddEditPackagesProps> = (
  props
) => {
  return (
    <>
      <PackageForm />
    </>
  );
};

export default AddEditPackages;
