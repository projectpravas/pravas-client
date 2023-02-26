import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import SecondaryBarMenus from "./SecondaryBarMenus";
import AdminRoutes from "../../shared/routes/AdminRoutes";
import { useLocation } from "react-router-dom";

interface Props {
  window?: () => Window;
  children: any;
  openStatus: boolean;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    threshold: 50,
  });

  return (
    <Slide
      appear={false}
      direction="down"
      style={{ transition: "3s ease-in-out" }}
      in={!trigger}
    >
      {children}
    </Slide>
  );
}

const SecondaryAppbar = (props: any) => {
  const { pathname } = useLocation();

  const subMenus = AdminRoutes?.find(
    (route) => route?.path == pathname.split("/")[2]
  )?.subMenus;

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <Paper sx={{ position: "relative", overflow: "hidden" }}>
          <Grid
            container
            sx={{
              width: props.openStatus
                ? `cal(100% - 240px)`
                : `cal(100% - 65px)`,
              position: "fixed",
              minHeight: "64px",
              alignItems: "center",
              p: 1,
              ml: -4,
              zIndex: 2,
              backgroundColor: "#faf5ee",
            }}
          >
            <SecondaryBarMenus tabs={Array.isArray(subMenus) ? subMenus : []} />
          </Grid>
        </Paper>
      </HideOnScroll>
    </React.Fragment>
  );
};

export default SecondaryAppbar;
