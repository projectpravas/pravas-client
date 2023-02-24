import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";

interface ICustomiseTourPackageProps {}

const CustomiseTourPackage: React.FunctionComponent<
  ICustomiseTourPackageProps
> = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/pravas/explore/custom-tour-form");
  };
  return (
    <>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          marginY: "20px",
        }}
      >
        <Container
          sx={{
            padding: "20px",
            width: "70%",

            borderRadius: "20px",
            boxShadow: "3px 3px 17px 0px rgba(0,0,0,0.2)",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",

              justifyContent: "space-evenly",
            }}
          >
            <Grid
              item
              xs={12}
              md={8}
              lg={9}
              sx={{ paddingRight: "20px", marginBottom: { xs: "20px" } }}
            >
              <Typography
                sx={{
                  fontFamily: "Lato",
                  fontSize: "2rem",
                  fontWeight: 700,
                }}
              >
                Customize Your<span style={{ color: "#27488d" }}> Tour</span>
              </Typography>
              <Typography sx={{ lineHeight: "24px" }}>
                You can plan your customized tour as well!.
              </Typography>
              <Typography sx={{ lineHeight: "24px" }}>
                fill the form, we will get back to you!
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              lg={3}
              sx={{
                display: "flex",

                alignItems: "center",
              }}
            >
              <Typography>
                <Button
                  sx={{
                    color: "white",
                    padding: "15px 50px",
                    fontWeight: "700",
                    backgroundColor: "#005D9D",
                    fontFamily: "poppins",
                    "&:hover": {
                      bgcolor: "#27488d",
                      color: "white",
                    },
                  }}
                  onClick={handleClick}
                >
                  CUSTOMIZE
                  <ArrowRightAltIcon
                    sx={{ "&:hover": { color: "white" }, color: "white" }}
                  />
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </>
  );
};

export default CustomiseTourPackage;
