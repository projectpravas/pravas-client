import { Grid, Paper } from "@mui/material";
import * as React from "react";
import { ResponsiveContainer } from "recharts";
import VisitorsLineChart from "./LineChart/VisitorsLineChart";
import TrialPieChart from "./PieChart/TrialPieChart";

interface ILineAndPieProps {}

const LineAndPie: React.FunctionComponent<ILineAndPieProps> = (props) => {
  const [singleVisitorIndex, setSingleVisitorIndex] = React.useState(0);

  return (
    <>
      <Grid container sx={{ pt: 6 }} spacing={2} justifyContent="space-between">
        {/* Total Visitors & Total Users Line Chart */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ borderRadius: 2 }}>
            <VisitorsLineChart singleVisitorIndex={singleVisitorIndex} />
          </Paper>
        </Grid>
        {/* Total Visitors Monthly Chart */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ borderRadius: 2 }}>
            <TrialPieChart setSingleVisitorIndex={setSingleVisitorIndex} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default LineAndPie;
