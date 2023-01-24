import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

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
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  label="Your Name"
                  variant="outlined"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  label="Email Address"
                  variant="outlined"
                  type="email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  label="Phone Number"
                  variant="outlined"
                  sx={{ bgcolor: "faf5ee" }}
                  type="tel"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-basic"
                  label="Subject"
                  variant="outlined"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Write Message"
                  variant="outlined"
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  endIcon={<SendIcon />}
                >
                  SEND A MESSAGE
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FeelFreeToContact;
