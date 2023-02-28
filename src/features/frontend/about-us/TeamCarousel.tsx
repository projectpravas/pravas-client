import * as React from "react";
import UserService from "../../../services/UserService";
import OwlCarousel from "react-owl-carousel";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";

import { endPoints } from "../../../api";
interface ITeamCarouselProps {}

const MyCard = styled(Card)({
  ":hover": { boxShadow: "0.5px 0.5px 10px grey" },
  maxWidth: "250px",
  margin: "10px auto",
  maxHeight: "700px",
  justifyContent: "center",
});

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const typoName = {
  fontSize: "25px",
  fontWeight: 600,
  lineHeight: "1.3em",
  color: "#005d9d",
  padding: "4% 0 1% 0",
};

const typePosition = {
  fontSize: "15px",
  fontWeight: 400,
  lineHeight: "1.3em",
  color: "#b0b0b0",
  padding: "1% 0 5% 0",
};

const options = {
  lazyLoad: true,
  loop: true,
  autoplay: true,
  autoplayHoverPause: true,
  // margin: 30,
  responsiveClass: true,
  nav: false,
  dots: false,
  smartSpeed: 1000,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 1,
    },
    600: {
      items: 2,
    },
    700: {
      items: 2,
    },
    1000: {
      items: 4,
    },
  },
};

const TeamCarousel: React.FunctionComponent<ITeamCarouselProps> = (props) => {
  const [team, setTeam] = React.useState<Array<any>>();

  const loadTeam = () => {
    UserService.fetchAllUsers("")
      .then((response) => {
        setTeam(response?.data?.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  console.log("team admin.....", team);

  React.useEffect(() => {
    loadTeam();
  }, []);
  return (
    <>
      <Container>
        <Grid container sx={{ flexWrap: "wrap", minWidth: "xs" }}>
          <Box
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid>
              <Typography
                sx={{
                  fontSize: { xs: "2.5em", sm: "3em" },
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginBottom: "3%",
                  color: "#2e2e3e",
                }}
              >
                Meet the Team
              </Typography>

              <Item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  bgcolor: "transparent",
                }}
              >
                <Grid container justifyContent={"center"}>
                  <OwlCarousel
                    style={{ height: "400px !important" }}
                    className="owl-theme owl-carousel"
                    {...options}
                  >
                    {Array.isArray(team) &&
                      team
                        .filter((members) => members.role === "admin")
                        .map((member, i) => (
                          <MyCard
                            sx={{ height: "90%" }}
                            key={member?.name?.first + i}
                          >
                            <CardMedia
                              component="img"
                              height="280px"
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = "placeholder-blogs.png";
                              }}
                              image={
                                `${endPoints.serverBaseURL}/${member?.avatar}`
                                  ? `${endPoints.serverBaseURL}/${member?.avatar}`
                                  : "./placeholder-blogs.png"
                              }
                              alt=""
                            />
                            <Typography sx={typoName}>
                              {member?.name?.first}
                            </Typography>
                            <Typography sx={typePosition}>
                              {member?.designation}
                            </Typography>
                          </MyCard>
                        ))}
                  </OwlCarousel>
                </Grid>
              </Item>
            </Grid>
          </Box>
        </Grid>
      </Container>
      {/*team*/}
    </>
  );
};

export default TeamCarousel;
