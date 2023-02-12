import React from "react";
import { Outlet } from "react-router-dom";

interface IRecordsProps {}

const Records: React.FunctionComponent<IRecordsProps> = (props) => {
  return (
    <>
      <h1>records</h1>
      <Outlet />
    </>
  );
};

export default Records;
