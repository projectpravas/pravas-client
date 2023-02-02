import * as React from "react";
import PackageForm1 from "./PackageForm1";
import PackageForm from "./PakageForm";

interface IAddEditPackagesProps {}

const AddEditPackages: React.FunctionComponent<IAddEditPackagesProps> = (
  props
) => {
  return (
    <>
      {/* <PackageForm1 /> */}
      <PackageForm />
    </>
  );
};

export default AddEditPackages;
