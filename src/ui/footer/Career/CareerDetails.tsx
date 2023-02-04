import {
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import * as React from "react";
import { careerDetail } from "./CareerData";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { styled } from "@mui/system";

const DescTypo = styled(Typography)({
  fontSize: "0.9em",
});

interface ICareerDetailsProps {}

const CareerDetails: React.FunctionComponent<ICareerDetailsProps> = (props) => {
  return (
    <>
      <Container sx={{ py: 8 }}>
        <Grid container spacing={3}>
          {/*--------------------Details------------------- */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={5}>
              {/* Title,location,tags,salary,jobDesc */}
              <Grid item xs={12}>
                <Typography variant="h4">{careerDetail?.jobTitle}</Typography>
                <Typography sx={{ py: 1 }}>
                  {careerDetail?.jobLocation}
                </Typography>
                <Grid
                  container
                  sx={{
                    pr: 2,
                    justifyContent: { xs: "center", md: "space-between" },
                    pb: 2,
                  }}
                >
                  <Grid item sx={{ pb: { xs: 2, md: 0 } }}>
                    <Stack direction="row" spacing={1}>
                      {Array.isArray(careerDetail?.tags) &&
                        careerDetail?.tags.map((tag: string, i: number) => (
                          <Chip
                            key={i}
                            label={tag}
                            color="info"
                            variant="outlined"
                            sx={{ borderRadius: 2 }}
                          />
                        ))}
                    </Stack>
                  </Grid>
                  <Grid item>
                    <Stack direction="row" spacing={1}>
                      <CurrencyRupeeIcon />
                      <Typography>
                        <b>
                          {careerDetail?.lowerSalary} -
                          {careerDetail?.higherSalary}
                        </b>
                        /month
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <DescTypo>{careerDetail?.jobDesc}</DescTypo>
              </Grid>
              {/* Company Desc */}
              <Grid item xs={12}>
                <Typography variant="h5">Who We Are</Typography>
                <DescTypo>{careerDetail?.companyDesc}</DescTypo>
              </Grid>
              {/* Benifits */}
              <Grid item xs={12}>
                <Typography variant="h5">Working With Us</Typography>
                <DescTypo>{careerDetail?.benefits}</DescTypo>
              </Grid>
            </Grid>
          </Grid>
          {/* -----------------Apply & Refer---------------- */}
          <Grid item xs={12} md={4} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Paper elevation={2}>
                <Grid
                  container
                  flexDirection="column"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      startIcon={<ForwardToInboxOutlinedIcon />}
                    >
                      Apply Now
                    </Button>
                  </Grid>
                  <Grid item xs={12} sx={{ pb: 2 }}>
                    <Button variant="outlined" endIcon={<ShareOutlinedIcon />}>
                      Refer SomeOne
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CareerDetails;
