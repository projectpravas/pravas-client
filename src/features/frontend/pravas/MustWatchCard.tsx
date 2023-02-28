import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TourService from "../../../services/TourService";
import { endPoints } from "../../../api";
import endpoints from "../../../api/endpoints";

interface IMustWatchCardProps {}

const MustWatchcard: React.FunctionComponent<IMustWatchCardProps> = (props) => {
  const [allPackageWatch, setAllPackageWatch] = React.useState<Array<any>>([]);

  const loadWatchCard = () => {
    TourService.fetchAllTours()
      .then((response) => {
        setAllPackageWatch(
          response?.data?.data.filter(
            (v: any, i: number) =>
              v.category == "package" && v.packageStatus == "active"
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    loadWatchCard();
  }, []);

  return (
    <>
      <Grid>
        <Paper
          elevation={0}
          sx={{
            border: "1px solid #faf5ee ",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <Container sx={{ marginTop: "15px" }}>
            <Typography
              sx={{
                fontFamily: "poppins",
                color: "#313041",

                fontSize: "20px",
                fontWeight: "700",
                marginLeft: "20px",
              }}
            >
              Must Watch
            </Typography>
          </Container>

          {Array.isArray(allPackageWatch) &&
            allPackageWatch
              .filter(
                (v, i) =>
                  v.category == "package" &&
                  v.packageStatus == "active" &&
                  i < 9
              )
              .map((watchCard: any, i: number) => (
                <Container
                  key={watchCard.id + i}
                  sx={{ borderBottom: "1px  solid #faf5ee" }}
                >
                  <Grid container sx={{ marginLeft: "20px" }}>
                    <Grid
                      sx={{
                        display: "flex",
                        my: 2,
                      }}
                    >
                      <img
                        style={{ width: "35%", borderRadius: "10px" }}
                        src={`${endpoints?.serverBaseURL}/${watchCard?.images[0]}`}
                      />

                      <Grid sx={{ ml: 2 }}>
                        <Typography
                          sx={{
                            color: "#2C5799",
                            fontSize: "16px",
                            fontWeight: "800",
                            fontFamily: "poppins",
                          }}
                        >
                          {watchCard?.title}
                        </Typography>
                        <Typography sx={{ display: "flex", mt: 1 }}>
                          <span
                            style={{
                              color: "#97978F",
                              fontWeight: "700",
                            }}
                          >
                            From
                          </span>
                          <span
                            style={{
                              marginLeft: "10px",
                              color: "#2C5799",
                              fontWeight: "700",
                            }}
                          >
                            {`₹${watchCard?.price}`}
                          </span>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Container>
              ))}
        </Paper>
      </Grid>
    </>
  );
};

export default MustWatchcard;
