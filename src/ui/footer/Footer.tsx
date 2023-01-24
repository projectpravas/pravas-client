import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { NavLink as NLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Link = styled(NLink)({
  textDecoration: "none",
  color: "#fff",
});

const FooterGrid = (compArray: Array<ReactJSXElement>) => {
  return (
    <>
      {Array.isArray(compArray) &&
        compArray.map((comp, i) => {
          return (
            <Grid
              key={i + "-"}
              item
              xs={12}
              sm={6}
              md={4}
              sx={{ p: { sm: 1, md: 4 }, mb: { xs: 2, md: 0 } }}
            >
              {comp}
            </Grid>
          );
        })}
    </>
  );
};

const SocialMediaIconsGrid = (icon: ReactJSXElement, linkPath: string) => {
  return (
    <Grid item sx={{ p: 1 }}>
      <Avatar sx={{ backgroundColor: "#e0e0e0" }}>
        <a href={linkPath}>{icon}</a>
      </Avatar>
    </Grid>
  );
};

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <Grid container sx={{ backgroundColor: "#313041" }}>
      <Grid item xs={12} sx={{ mx: { md: 0, lg: 5 } }}>
        <Grid
          container
          sx={{
            padding: 4,
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            flexWrap: { sm: "", md: "nowrap" },
            m: "auto",
            width: { md: "100%", xl: "70%" },
          }}
        >
          {/* Single block */}
          {FooterGrid([
            <>
              <Box component="div" sx={{ diplay: "flex", color: "#fff" }}>
                <Box
                  sx={{
                    width: { xs: "60%", md: "50%" },
                    minWidth: "50%",
                    maxWidth: "70%",
                  }}
                >
                  <Link to="https://pravasthejourney.com/">
                    <Box
                      component="img"
                      sx={{ width: { xs: "70%", sm: "100%" } }}
                      src="https://pravasthejourney.com/wp-content/uploads/2021/08/Pravas-Tourism-footer.png"
                    />
                  </Link>
                </Box>
                <Divider color="#888" />
                <Grid
                  container
                  sx={{
                    flexWrap: "nowrap",
                    mt: 2,
                  }}
                >
                  <Grid item sx={{ mr: 2 }}>
                    <PhoneIcon />
                  </Grid>
                  <a
                    href={`tel:${"+91 72619 88688"}`}
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    +91 72619 88688
                  </a>
                </Grid>
                <Grid container sx={{ flexWrap: "nowrap" }}>
                  <Grid item sx={{ mr: 2 }}>
                    <EmailIcon />
                  </Grid>

                  <a
                    href={`mailTo:${"travel@pravasthejourney.com"}`}
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      wordBreak: "break-all",
                    }}
                  >
                    travel@pravasthejourney.com
                  </a>
                </Grid>
              </Box>
            </>,
            <>
              <h2 style={{ color: "#fff", fontSize: "1.2rem" }}>Important</h2>
              <Divider color="#888" />
              <Box component="div" sx={{ diplay: "flex", color: "#fff" }}>
                <List dense={true}>
                  <ListItem>
                    <ListItemText>
                      <Link to="#">Privacy Policy</Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      <Link to="#">Cancellation Policy</Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      <Link to="#">Terms & Conditions</Link>
                    </ListItemText>
                  </ListItem>
                </List>
              </Box>
            </>,
            <>
              <h2 style={{ color: "#fff", fontSize: "1.2rem" }}>
                Office Address
              </h2>
              <Divider color="#888" />
              <Grid
                sx={{
                  display: "flex",
                  color: "#fff",
                  flexDirection: "row",
                  alignItems: "center",
                  // mt: { sm: 0, md: 5 },
                }}
              >
                <Box>
                  <LocationOnIcon />
                </Box>
                <List dense={true}>
                  <ListItem>
                    <ListItemText primary="3rd floor, Goodwill house, Above Nisarg Restaurant, Erandwane, Pune 411004." />
                  </ListItem>
                </List>
              </Grid>
            </>,
            <>
              <h2 style={{ color: "#fff", fontSize: "1.2rem" }}>Explore</h2>
              <Divider color="#888" />

              <Box component="div" sx={{ diplay: "flex", color: "#fff" }}>
                <List dense={true}>
                  <ListItem>
                    <ListItemText>
                      <Link to="#">About</Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      <Link to="#">Pravas</Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      <Link to="#">Contact</Link>
                    </ListItemText>
                  </ListItem>
                </List>
              </Box>
            </>,
          ])}
        </Grid>
      </Grid>
      <Paper
        sx={{
          width: { xs: "100%", sm: "80%" },
          backgroundColor: "#fff",
          ml: { xs: "0%", sm: "20%" },
          borderRadius: { xs: "10px 10px 0 0", sm: "10px 0 0 4px" },
        }}
      >
        <Grid
          container
          xs={12}
          sx={{
            m: 0,
            p: { xs: 0, sm: 2 },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} sm={5}>
            <Grid
              container
              sx={{ justifyContent: { xs: "center", sm: "start" } }}
            >
              {SocialMediaIconsGrid(
                <FacebookIcon
                  sx={{ verticalAlign: "middle", color: "blue" }}
                />,
                "https://www.facebook.com/PravasTheJourney/"
              )}

              {SocialMediaIconsGrid(
                <InstagramIcon
                  sx={{ verticalAlign: "middle", color: "#f707e2" }}
                />,
                "https://www.instagram.com/PravasTheJourney/"
              )}

              {SocialMediaIconsGrid(
                <YouTubeIcon sx={{ verticalAlign: "middle", color: "red" }} />,
                "https://www.youtube.com/channel/UC8fBF7BsghNjfrdyGVvMKHw"
              )}
            </Grid>
          </Grid>
          <Divider
            color="#888"
            orientation="horizontal"
            sx={{ width: { xs: "100%", sm: "2px", alignSelf: "normal" } }}
          />
          <Grid
            item
            xs={12}
            sm={6}
            flexGrow={1}
            sx={{
              textAlign: "center",
              pl: 2,
            }}
          >
            <Typography>
              Pravas The Journey ©2023. All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Footer;
