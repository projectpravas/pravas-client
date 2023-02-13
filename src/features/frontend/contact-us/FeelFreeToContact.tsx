import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import { Link as MLink, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import ContactForm from "./ContactForm";
import { styled } from "@mui/material/styles";

const ClickableLink = styled(MLink)({
  margin: "2px 0px",
});

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
                <Box>
                  <Box
                    sx={{
                      fontSize: 20,
                    }}
                  >
                    Talk with our team
                  </Box>
                  <Box
                    sx={{
                      fontSize: 34,
                      fontWeight: 900,
                    }}
                  >
                    Feel Free to Contact
                  </Box>
                </Box>
              </Grid>

              {/* phone */}
              <Grid item xs={12} sm={6} md={12}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    pt: 4,
                    border: "1px solid",
                    borderColor: "#ebe6de",
                    borderRadius: 2,
                  }}
                >
                  <Grid
                    container
                    sx={{
                      flexDirection: { xs: "column", md: "row" },
                      justifyContent: {
                        xs: "center",
                        md: "space-around",
                      },
                      alignItems: { xs: "center" },
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
                    {/* Logo Grid */}
                    <Grid
                      item
                      xs={12}
                      md={3}
                      sx={{ marginBottom: { xs: 2, md: 0 } }}
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
                    </Grid>
                    {/* Text Area Grid */}
                    <Grid item xs={12} md={9} sx={{ mt: { xs: 1, md: 0 } }}>
                      <Grid
                        container
                        flexDirection="column"
                        alignItems="center"
                        spacing={3}
                      >
                        <Link
                          sx={{ textDecoration: "none" }}
                          href="tel:+9172619 88688"
                        >
                          <Typography
                            sx={{
                              color: "black",
                              fontSize: 20,
                              fontWeight: 700,
                            }}
                          >
                            Phone
                          </Typography>
                        </Link>
                        <ClickableLink
                          sx={{
                            textDecoration: "none",
                            color: "#757783",
                            marginLeft: { md: 3 },
                          }}
                          href="tel:+9172619 88688"
                        >
                          +91 72619 88688
                        </ClickableLink>
                        <ClickableLink
                          sx={{
                            textDecoration: "none",
                            color: "#757783",
                            marginLeft: { md: 3 },
                          }}
                          href="tel:+9172619 88688"
                        >
                          +91 95525 64478
                        </ClickableLink>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* email */}
              <Grid item xs={12} sm={6} md={12}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: "#ebe6de",
                    borderRadius: 2,
                  }}
                >
                  <Grid
                    container
                    sx={{
                      flexDirection: { xs: "column", md: "row" },
                      justifyContent: { xs: "space-between" },
                      alignItems: { xs: "center" },
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      md={3}
                      sx={{ marginBottom: { xs: 1, sm: 0 } }}
                    >
                      <ClickableLink
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
                      </ClickableLink>
                    </Grid>
                    <Grid item xs={12} md={9} sx={{ mt: { xs: 2, md: 0 } }}>
                      <Grid
                        container
                        flexDirection="column"
                        alignItems="center"
                        spacing={1}
                      >
                        <ClickableLink
                          sx={{
                            textDecoration: "none",
                          }}
                          href="tel:+9172619 88688"
                        >
                          <Typography
                            sx={{
                              color: "black",
                              fontSize: 20,
                              fontWeight: 700,
                            }}
                          >
                            Email
                          </Typography>
                        </ClickableLink>
                        <ClickableLink
                          sx={{
                            textDecoration: "none",
                            color: "#757783",
                            wordBreak: "break-all",
                            marginLeft: { xs: 1, sm: 1, md: 3 },
                          }}
                          href="mailto:travel@pravasthejourney.com"
                        >
                          travel@pravasthejourney.com
                        </ClickableLink>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          {/* contact us form (Right Section) */}
          <Grid item xs={12} md={8} sx={{ px: 2, mt: { xs: 4, md: 0 } }}>
            <ContactForm />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FeelFreeToContact;
