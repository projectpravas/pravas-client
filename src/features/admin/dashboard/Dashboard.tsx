import * as React from "react";
import { Outlet } from "react-router-dom";
import CustomTitle from "../../../ui/title/CustomTitle";
import TopComp from "./Top Cards/TopComp";
import Container from "@mui/material/Container";
import LineAndPie from "./Line&Pie/LineAndPie";

interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
    <>
      {/* <h1>Dashboard</h1> */}
      <CustomTitle title="Dashboard" />
      <Outlet />
      <Container>
        <TopComp />
        <LineAndPie />
      </Container>
    </>
  );
};

export default Dashboard;
