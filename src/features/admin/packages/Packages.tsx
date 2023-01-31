import * as React from "react";
import AddEditPackages from "./AddEditPackages";

interface IPackagesProps {}

const Packages: React.FunctionComponent<IPackagesProps> = (props) => {
  return (
    <>
      <h1>Packages</h1>
      <AddEditPackages />
    </>
  );
};

export default Packages;
