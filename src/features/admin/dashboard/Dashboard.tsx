import * as React from "react";
import { Outlet } from "react-router-dom";
import CustomTitle from "../../../ui/title/CustomTitle";

interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
    <>
      {/* <h1>Dashboard</h1> */}
      <CustomTitle title="Dashboard" />
      <Outlet />
    </>
  );
};

export default Dashboard;
