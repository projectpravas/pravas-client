import * as React from "react";
import { Outlet } from "react-router-dom";
import CustomTitle from "../../../ui/title/CustomTitle";
import TopComp from "./Top Cards/TopComp";
import Container from "@mui/material/Container";
import LineAndPie from "./Line&Pie/LineAndPie";
import TotalBlogsTours from "./TotalBlogs-Tours/TotalBlogsTours";
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
        <TopComp />
        <LineAndPie />
        {/* <TotalBlogsTours /> */}
        <TotalBlogsNew />
      </Container>
    </div>
  );
};

export default Dashboard;
