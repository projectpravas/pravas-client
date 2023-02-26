import Box from "@mui/material/Box";
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
  Area,
  AreaChart,
} from "recharts";
import { data } from "../../data";

interface IVisitorsAreaChartProps {
  singleVisitorIndex: any;
}
interface IWeekData {
  name: string;
  totalVisitors: number;
  users: number;
}

const VisitorsAreaChart: React.FunctionComponent<IVisitorsAreaChartProps> = ({
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
    <Box>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart
          width={700}
          height={200}
          data={weekData}
          margin={{
            top: 25,
            right: 40,
            left: 0,
            bottom: 15,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="totalVisitors"
            stroke="#8884d8"
            // strokeWidth={3}
            fillOpacity={2}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#82ca9d"
            // strokeWidth={3}
            fillOpacity={2}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default VisitorsAreaChart;
