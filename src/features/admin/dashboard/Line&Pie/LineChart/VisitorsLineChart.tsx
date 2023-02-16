import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { data } from "../../data";

interface IVisitorsLineChartProps {
  singleVisitorIndex: any;
}
interface IWeekData {
  name: string;
  totalVisitors: number;
  users: number;
}

const VisitorsLineChart: React.FunctionComponent<IVisitorsLineChartProps> = ({
  singleVisitorIndex,
}) => {
  const [weekData, setWeekData] = useState<Array<IWeekData>>(data[0].weeks);

  const singleData = (i: string | number | any) => {
    setWeekData(data[i].weeks);
  };

  useEffect(() => {
    singleData(singleVisitorIndex);
  }, [singleVisitorIndex]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // border: "1px solid blue",
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={700}
          height={200}
          data={weekData}
          margin={{
            top: 5,
            right: 30,
            left: 1,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalVisitors"
            stroke="#8884d8"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#82ca9d"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default VisitorsLineChart;
