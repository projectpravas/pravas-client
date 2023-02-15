import React from "react";
import { Outlet } from "react-router-dom";
import CustomTitle from "../../../ui/title/CustomTitle";

interface IRecordsProps {}

const Records: React.FunctionComponent<IRecordsProps> = (props) => {
  return (
    <>
      {/* <h1>records</h1> */}
      <CustomTitle title="Records" />
      <Outlet />
    </>
  );
};

export default Records;
