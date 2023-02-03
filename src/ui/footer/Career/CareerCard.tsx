import * as React from "react";
import { Avatar, Button, Container, Grid, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { NavLink } from "react-router-dom";

interface ICareerCardProps {
  jobDetail: any;
}

const CareerCard: React.FunctionComponent<ICareerCardProps> = ({
  jobDetail,
}) => {
  return (
    <>
      <Container>
        <Grid container justifyContent="space-between">
          {/* -------------Title & Tags------------ */}
          <Grid item xs={12} md={6}>
            <Grid container flexDirection="column" spacing={4}>
              {/* Title */}
              <Grid item sx={{ mb: { xs: -3, md: 0 } }}>
                <Stack direction="row" spacing={2}>
                  <Avatar variant="rounded">
                    <WorkOutlineOutlinedIcon />
                  </Avatar>
                  <Typography variant="h4">{jobDetail?.jobTitle}</Typography>
                </Stack>
              </Grid>
              {/* Tags */}
              <Grid item>
                <Stack direction="row" spacing={3}>
                  {Array.isArray(jobDetail?.tags) &&
                    jobDetail?.tags.map((tag: string, i: number) => (
                      <Chip
                        key={i}
                        label={tag}
                        color="success"
                        variant="filled"
                        sx={{ borderRadius: 2 }}
                      />
                    ))}
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          {/* -------------Salary, Apply & Details------------- */}
          <Grid item xs={12} md={3} sx={{ mt: { xs: 2, md: 0 } }}>
            <Grid
              container
              flexDirection="column"
              spacing={4}
              justifyContent="center"
              alignContent="center"
            >
              {/* Salary */}
              <Grid item sx={{ mb: { xs: -2, md: 0 } }}>
                <Stack direction="row" spacing={1}>
                  <CurrencyRupeeIcon />
                  <Typography>
                    <b>
                      {jobDetail?.lowerSalary}-{jobDetail?.higherSalary}
                    </b>
                    /month
                  </Typography>
                </Stack>
              </Grid>
              {/* Apply Button */}
              <Grid item>
                <Stack direction="row" spacing={1}>
                  <Grid item>
                    <Button variant="contained" size="medium">
                      Apply Now
                    </Button>
                  </Grid>

                  <NavLink
                    to={`${jobDetail?.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Grid item>
                      <Button variant="contained" size="medium">
                        Details
                      </Button>
                    </Grid>
                  </NavLink>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CareerCard;
