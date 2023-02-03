import * as React from "react";
import { Container, Grid, Paper } from "@mui/material";
import CareerCard from "./CareerCard";
import { careerDetails } from "./CareerData";

interface ICareersProps {}

const Careers: React.FunctionComponent<ICareersProps> = (props) => {
  return (
    <>
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
