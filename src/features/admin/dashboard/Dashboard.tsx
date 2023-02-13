import * as React from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TopComp from "./top/TopComp";

import VisitorsUsersBarChart from "./BarChart/VisitorsUsersBarChart";
import UsersPieChart from "./PieChart/UserPieChart";

interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
    <>
      <h1>Dashboard </h1>
      <Outlet />
      <TopComp />
      <Grid container>
        {/* --------------------------------Total Vsitors & Total Users Bar Chart */}
        <Grid item xs={12} md={8}>
          <VisitorsUsersBarChart />
        </Grid>
        <Grid item xs={12} md={4}>
          <UsersPieChart />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
