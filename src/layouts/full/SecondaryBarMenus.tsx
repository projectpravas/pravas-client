import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { NavLink as NLink, useLocation } from "react-router-dom";

const NavLink = styled(NLink)({
  textDecoration: "none",
  marginRight: "30px",
});

interface ISecondaryBarMenus {
  tabs: [] | any;
}

const SecondaryBarMenus: React.FunctionComponent<ISecondaryBarMenus> = (
  tabs
) => {
  const [value, setValue] = React.useState("recents");

  const { pathname } = useLocation();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ backgroundColor: "inherit", height: "32px" }}
      value={value}
      onChange={handleChange}
    >
      {Array.isArray(tabs?.tabs) &&
        tabs?.tabs.map((tab, i) => {
          return (
            <NavLink
              sx={{ display: "flex", m: 0 }}
              to={`${pathname.split("/")[2]}/${tab?.path}`}
              style={({ isActive }) => ({
                color: isActive ? "grey" : "black",
                borderBottom: isActive ? "3px solid #27488d" : "black",
              })}
            >
              <Grid item xs={12} alignSelf="center">
                <BottomNavigationAction
                  label={tab?.label}
                  value={tab?.path}
                  showLabel={true}
                  sx={{
                    "& .MuiBottomNavigationAction-label": {
                      fontSize: { xs: "0.8em", sm: "1.2em" },
                      color: "black",
                      verticalAlign: "middle",
                    },
                  }}
                />
              </Grid>
            </NavLink>
          );
        })}
    </BottomNavigation>
  );
};

export default SecondaryBarMenus;
