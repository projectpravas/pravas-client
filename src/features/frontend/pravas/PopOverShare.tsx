import * as React from "react";

import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ShareIcon from "@mui/icons-material/Share";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";

interface IPopOverShareProps {}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  border: "1px solid gray ",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

const PopOverShare: React.FunctionComponent<IPopOverShareProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{
          bgcolor: "#f0f3f6",
          color: "#838590",
          fontWeight: "700",
          fontFamily: "poppins",
          "&:hover": {
            bgcolor: "#27488d",
            color: "white",
          },
        }}
      >
        Open Popover
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Grid sx={{ width: "200px" }}>
          <Grid container spacing={2}>
            <Grid item>
              <Link
                href="http://www.facebook.com/sharer.php?s=100&amp;p[url]=https%3A%2F%2Fpravasthejourney.com%2Fbooking%2Fkashmir-4n5d%2F&amp;p[title]=Kashmir+4N5D"
                target="_blank"
              >
                <FacebookIcon sx={{ fontSize: "50px" }} />
              </Link>
            </Grid>

            <Grid item>
              <Link
                href="http://twitter.com/share?text=Kashmir+4N5D&amp;url=https%3A%2F%2Fpravasthejourney.com%2Fbooking%2Fkashmir-4n5d%2F"
                target="_blank"
              >
                <TwitterIcon sx={{ fontSize: "50px", color: "#1DA1F2" }} />
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="http://linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fpravasthejourney.com%2Fbooking%2Fkashmir-4n5d%2F&amp;title=Kashmir+4N5D"
                target="_blank"
              >
                <LinkedInIcon
                  style={{
                    fontSize: "50px",
                  }}
                />
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="http://whatsapp.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fpravasthejourney.com%2Fbooking%2Fkashmir-4n5d%2F&amp;title=Kashmir+4N5D"
                target="_blank"
              >
                <WhatsAppIcon
                  style={{
                    fontSize: "40px",
                    backgroundColor: "green",
                    color: "white",
                    borderRadius: "10px",
                  }}
                />
              </Link>
            </Grid>

            <Grid item>
              <Link
                href="http://share.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fpravasthejourney.com%2Fbooking%2Fkashmir-4n5d%2F&amp;title=Kashmir+4N5D"
                target="_blank"
              >
                <ShareIcon
                  style={{
                    fontSize: "50px",
                  }}
                />
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="http://mail.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fpravasthejourney.com%2Fbooking%2Fkashmir-4n5d%2F&amp;title=Kashmir+4N5D"
                target="_blank"
              >
                <EmailIcon
                  style={{
                    fontSize: "50px",
                    color: "red",
                  }}
                />
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="http://message.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fpravasthejourney.com%2Fbooking%2Fkashmir-4n5d%2F&amp;title=Kashmir+4N5D"
                target="_blank"
              >
                <MessageIcon
                  style={{
                    fontSize: "50px",
                  }}
                />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Popover>
    </div>
  );
};

export default PopOverShare;
