import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";

import ContactForm from "./ContactForm";

interface IFeelFreeToContactProps {}

const FeelFreeToContact: React.FunctionComponent<IFeelFreeToContactProps> = (
  props
) => {
  return (
    <>
      <Container>
        <Grid container spacing={1}>
          {/* feel free to contact section (Left Section) */}
          <Grid item xs={12} md={4} sx={{ px: 2 }}>
            <Grid container spacing={4}>
              {/* feel free to contact */}
              <Grid item xs={12}>
                <Box sx={{ pt: 3 }}>
                  <Box
                    sx={{
                      fontSize: 20,
                    }}
                  >
                    Talk with our team
                  </Box>
                  <Box
                    sx={{
                      fontSize: 35,
                      fontWeight: 700,
                    }}
                  >
                    Feel Free to Contact
                  </Box>
                </Box>
              </Grid>
              {/* phone */}
              <Grid item xs={12}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: "#ebe6de",
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Link
                    sx={{
                      textDecoration: "none",
                      alignSelf: "center",
                    }}
                    href="tel:6668880000"
                  >
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        cursor: "pointer",
                        bgcolor: "#f39100",
                        "&:hover": {
                          bgcolor: "#e8604c",
                        },
                      }}
                    >
                      <CallOutlinedIcon />
                    </Avatar>
                  </Link>
                  <Grid display="flex" flexDirection="column">
                    <Link
                      sx={{
                        textDecoration: "none",
                        color: "black",
                        fontSize: 20,
                        fontWeight: 700,
                      }}
                      href="tel:+9172619 88688"
                    >
                      Phone
                    </Link>
                    <Link
                      sx={{ textDecoration: "none", color: "#757783" }}
                      href="tel:+9172619 88688"
                    >
                      +91 72619 88688
                    </Link>
                    <Link
                      sx={{ textDecoration: "none", color: "#757783" }}
                      href="tel:+9172619 88688"
                    >
                      +91 95525 64478
                    </Link>
                  </Grid>
                </Paper>
              </Grid>
              {/* email */}
              <Grid item xs={12}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: "#ebe6de",
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Link
                    sx={{
                      textDecoration: "none",
                      alignSelf: "center",
                    }}
                    href="tel:6668880000"
                  >
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        cursor: "pointer",
                        bgcolor: "#f39100",
                        "&:hover": {
                          bgcolor: "#e8604c",
                        },
                      }}
                    >
                      <AlternateEmailOutlinedIcon />
                    </Avatar>
                  </Link>
                  <Grid display="flex" flexDirection="column">
                    <Link
                      sx={{
                        textDecoration: "none",
                        color: "black",
                        fontSize: 20,
                        fontWeight: 700,
                      }}
                      href="tel:+9172619 88688"
                    >
                      Email
                    </Link>
                    <Link
                      sx={{ textDecoration: "none", color: "#757783" }}
                      href="mailto:travel@pravasthejourney.com"
                    >
                      travel@pravasthejourney.com
                    </Link>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          {/* contact us form (Right Section) */}

          <Grid item xs={12} md={8} sx={{ px: 2 }}>
            <ContactForm />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FeelFreeToContact;
