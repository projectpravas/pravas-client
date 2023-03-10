import * as React from "react";
import { Container, Grid, Paper } from "@mui/material";
import CareerCard from "./CareerCard";
import { careerDetails } from "./CareerData";
import { Helmet } from "react-helmet-async";

interface ICareersProps {}

const Careers: React.FunctionComponent<ICareersProps> = (props) => {
  return (
    <>
      <Helmet>
        <title>Pravas Careers</title>
        <meta name="description" content="Careers With Us" />
        <meta name="keywords" content="Pravas Tourism Careers" />
        <link rel="canonical" href="/careers" />
      </Helmet>
      <Container sx={{ py: 4 }}>
        <Grid container justifyContent="center">
          {Array.isArray(careerDetails) &&
            careerDetails.map((jobDetail, i) => (
              <Grid item xs={12} md={10} key={i}>
                <Paper
                  elevation={7}
                  sx={{
                    mb: 2,
                    p: 1,
                    borderRadius: 2,
                    backgroundColor: "white",
                    "&:hover": {
                      boxShadow: "0px 0px 30px -5px rgb(0 0 0 / 50%)",
                    },
                  }}
                >
                  <CareerCard jobDetail={jobDetail} />
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default Careers;

// {
//   id,
//   benefits,
//   jobTitle,
//   companyDesc,
//   higherSalary,
//   lowerSalary,
//   jobDesc,
//   jobLocation,
//   tags,
// },
