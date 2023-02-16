import { Grid } from "@mui/material";
import * as React from "react";
import { ResponsiveContainer } from "recharts";
import VisitorsLineChart from "./LineChart/VisitorsLineChart";
import TrialPieChart from "./PieChart/TrialPieChart";

interface ILineAndPieProps {}

const LineAndPie: React.FunctionComponent<ILineAndPieProps> = (props) => {
  const [singleVisitorIndex, setSingleVisitorIndex] = React.useState(0);

  return (
    <>
      <Grid container sx={{ pt: 8 }} spacing={2}>
        {/* --------------------------------Total Visitors & Total Users Line Chart */}
        <Grid
          item
          xs={12}
          sm={6}
          md={8}
          // sx={{ border: "1px solid", boxSizing: "border-box" }}
        >
          <VisitorsLineChart singleVisitorIndex={singleVisitorIndex} />
        </Grid>
        {/* --------------------------------------------Total Visitors Monthly Chart */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          // sx={{ border: "1px solid red", boxSizing: "border-box" }}
        >
          <TrialPieChart setSingleVisitorIndex={setSingleVisitorIndex} />
        </Grid>
      </Grid>
    </>
  );
};

export default LineAndPie;
