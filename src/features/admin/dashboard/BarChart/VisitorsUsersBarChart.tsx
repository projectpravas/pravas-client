import { Box } from "@mui/material";
import * as React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { data } from "./data";

interface IVisitorsUsersBarChartProps {}

const VisitorsUsersBarChart: React.FunctionComponent<
  IVisitorsUsersBarChartProps
> = (props) => {
  return (
    <>
      <ResponsiveContainer width="100%" aspect={2}>
        <BarChart
          width={100}
          height={400}
          data={data}
          margin={{
            top: 30,
            right: 50,
            left: 50,
            bottom: 5,
          }}
          barSize={16}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" stackId="a" fill="#2255bb" />
          <Bar dataKey="uv" stackId="a" fill="#4094f1" />
          {/* <Bar dataKey="amt" stackId="a" fill="#6084f1" /> */}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default VisitorsUsersBarChart;
