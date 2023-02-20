import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SearchBar from "./SearchBar";
import { Helmet } from "react-helmet";
import BlogsHome from "./BlogsHome";
import TourGallery from "../../../ui/tour-gallary/TourGallary";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import PravasHomeCarousel from "./PravasHomeCarousel";
import StartFromTop from "../../../ui/GoToTop/StartFromTop";
interface IHomeProps {}

const imgZoom = {
  overflow: "hidden",
  transform: "scale(1)",
  transition: "5s",
  "&:hover": {
    transform: "scale(1.1)",
    overflow: "hidden",
    transition: "5s ease-in-out",
  },
};

const seeMore = {
  fontSize: "1.12rem",
  backgroundColor: "#2c5799",
  color: "#fff",
  fontWeight: 500,
  letterSpacing: "2px",
  padding: "10px 20px",
  lineHeight: 1,
  borderRadius: "8px",
  border: "2px solid #2c5799",
  "&:hover": {
    color: "#2c5799",
    backgroundColor: "#fff",
    border: "2px solid #2c5799",
    transition: "0.2s",
  },
};

const typohead = {
  fontFamily: "Caveat,Sans-serif",
};
const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <>
      {/* head banner */}
      <Grid container minWidth="300px" sx={{ position: "relative" }}>
        <Grid>
          <img
            src="https://pravasthejourney.com/wp-content/uploads/2022/09/Web-C2.jpg"
            width="100%"
            height="100%"
            alt="not"
          />
          <Typography
            sx={{
              position: "absolute",
              top: "32%",
              left: "8%",
              fontSize: { xs: "1.5rem", md: "2.8rem" },
              fontFamily: " cursive",
              fontStyle: "italic",
              color: "white",
              textShadow: "0 0 10px rgb(0 0 0 / 30%)",
              maxWidth: "71.25",
              minHeight: "31.25",
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: -1,
            }}
          >
            Bun ke pravasee <br />
            dekho apna desh!
          </Typography>
          <Typography
            sx={{
              paddingTop: "4%",
              lineHeight: "1.86em",
              letterSpacing: "-.2px",
              fontSize: "1rem",
              position: "absolute",
              top: { xs: "55%", md: "48%" },
              left: "8%",
              color: "#fff",
              textShadow: "0 0 10px rgb(0 0 0 / 30%)",
              fontWeight: 500,
            }}
          >
            Travel, Be out in Nature and explore..
          </Typography>
        </Grid>

        {/* Search Bar  */}
        <Container
          sx={{
            position: "absolute",
            bottom: { xs: "-85%", sm: "-40%", md: "-10%", lg: "-8%" },
          }}
        >
          <SearchBar />
        </Container>
      </Grid>

      {/* Youtube video section */}
      <Container>
        <Grid
          container
          sx={{ paddingTop: { xs: 20, sm: 17, md: 15 } }}
          pt={18}
          pb={10}
          spacing={8}
        >
          <Grid item xs={12} md={6} sx={imgZoom}>
            <a
              href="https://www.youtube.com/watch?v=NYlnaBkB7RY"
              target="blank"
              style={{ width: "100%", height: "415px" }}
            >
              <img
                width="100%"
                src="https://pravasthejourney.com/wp-content/uploads/2022/09/omkar-mulgund.webp"
                alt="not"
              />
            </a>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontFamily: "monospace",
                color: "#f39100",
                fontSize: "1.25rem",
              }}
            >
              Experiance
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#313041",
                lineHeight: 1.2,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              WORLD OF SMILES.
            </Typography>
            <Typography
              sx={{
                paddingTop: "2.1rem",
                paddingBottom: { xs: "1.8rem", md: "1.2rem" },
                lineHeight: "1.86em",
                color: "#90929b",
                letterSpacing: ".-2px",
              }}
            >
              Pravas - A chance to rush-n-crush the daily routine moreover has
              some peaceful moments. Or get over boredom and be far from a
              problem or stress. We will take you to the quiet place where you
              can breathe fresh, spend quality time, revives your energy to grow
              further. Yes, you can find all these treasures all-in-one trip.
            </Typography>
            <NavLink to="/about-us" style={{ textDecoration: "none" }}>
              <Button sx={seeMore}>See More</Button>
            </NavLink>
          </Grid>
        </Grid>
      </Container>

      {/* blogs cards carousel  */}
      <BlogsHome />

      {/* Pravas cards carousel  */}
      <PravasHomeCarousel />

      <Helmet>
        <title>Pravas Tourism</title>
        <meta name="description" content="Pravas Tourism" />
        <meta name="keywords" content="Pravas Tourism" />
      </Helmet>

      {/* gallery  */}
      <TourGallery />

      {/* render from top  */}
      <StartFromTop />
    </>
  );
};

export default Home;
