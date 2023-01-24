import * as React from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import routes from "../../shared/routes/AdminRoutes";
import { NavLink as NLink } from "react-router-dom";

interface ISidebarMenuProps {}

const NavLink = styled(NLink)`
  text-decoration: none;
  margin-right: 10px;
`;

const SidebarMenu: React.FunctionComponent<ISidebarMenuProps> = (props) => {
  return (
    <>
      <List>
        {Array.isArray(routes) &&
          routes.map(({ label, path, icon, roles }, i) => (
            <NavLink
              end
              key={path + i}
              to={path}
              style={({ isActive }) => ({
                color: isActive ? "#aaa" : "black",
                borderBottom: isActive ? "3px solid #27488d" : "",
              })}
            >
              <ListItem
                key={path + i}
                disablePadding
                sx={{ display: "block", mt: 1 }}
              >
                <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                  <ListItemIcon
                    sx={{ minWidth: 0, justifyContent: "center", mr: 3 }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
      </List>
    </>
  );
};

export default SidebarMenu;
