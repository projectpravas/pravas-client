import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { data } from "../data";

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

  console.log("data ", weekData);
  return (
    <>
      <LineChart
        width={500}
        height={300}
        data={weekData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
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
    </>
  );
};

export default VisitorsLineChart;
