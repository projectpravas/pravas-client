import * as React from "react";
import { Outlet } from "react-router-dom";
import CustomTitle from "../../../ui/title/CustomTitle";
import TopComp from "./Top Cards/TopComp";
import Container from "@mui/material/Container";
import LineAndPie from "./Line&Pie/LineAndPie";
import TotalBlogsTours from "./TotalBlogs-Tours/TotalBlogsTours";
import TotalBlogsNew from "./NewDesignTotalBlogs-Tours/TotalBlogsNew";

interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
    <>
      {/* <CustomTitle title="Dashboard" /> */}
      <Outlet />
      <Container>
        <TopComp />
        <LineAndPie />
        {/* <TotalBlogsTours /> */}
        <TotalBlogsNew />
      </Container>
    </>
  );
};

export default Dashboard;
