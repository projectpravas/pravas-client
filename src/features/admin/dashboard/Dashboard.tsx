import * as React from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TopComp from "./Top Cards/TopComp";

import VisitorsUsersBarChart from "./BarChart/VisitorsUsersBarChart";
import UsersPieChart from "./PieChart/UserPieChart";
import PieChartData from "./PieChart/PieChartData";
import TrialPieChart from "./PieChart/TrialPieChart";
import VisitorsLineChart from "./BarChart/VisitorsLineChart";

interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  const [singleVisitorIndex, setSingleVisitorIndex] = React.useState(0);

  // console.log("singleVisitorIndex : ", singleVisitorIndex);

  return (
    <>
      <h1>Dashboard </h1>
      <Outlet />
      <TopComp />
      <Grid container>
        {/* --------------------------------Total Visitors & Total Users Line Chart */}
        <Grid item xs={12} md={6}>
          <VisitorsLineChart singleVisitorIndex={singleVisitorIndex} />
        </Grid>
        {/* --------------------------------------------Total Visitors Monthly Chart */}
        <Grid item xs={12} md={6}>
          <TrialPieChart setSingleVisitorIndex={setSingleVisitorIndex} />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
