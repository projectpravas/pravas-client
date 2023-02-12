import * as React from "react";
import { Outlet } from "react-router-dom";

interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
    <>
      <h1>Dashboard</h1>
      <Outlet />
    </>
  );
};

export default Dashboard;
