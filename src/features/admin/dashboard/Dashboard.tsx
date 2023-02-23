import * as React from "react";
import { Outlet } from "react-router-dom";
import CustomTitle from "../../../ui/title/CustomTitle";
import Container from "@mui/material/Container";
import LineAndPie from "./Line&Pie/LineAndPie";
import TotalBlogsNew from "./NewDesignTotalBlogs-Tours/TotalBlogsNew";
import TopNewCards from "./Top Cards/TopNewCards";

interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
    <div>
      {/* <CustomTitle title="Dashboard" /> */}
      <Outlet />
      <Container>
        <TopNewCards />
        <LineAndPie />
        <TotalBlogsNew />
      </Container>
    </div>
  );
};

export default Dashboard;
