import React from "react";
import { Outlet, useLocation } from "react-router-dom";

interface IPravasProps {}

const Pravas: React.FunctionComponent<IPravasProps> = (props) => {
  const { pathname } = useLocation();
  const showPravas =
    pathname.split("/")[pathname.split("/").length - 1] == "pravas";

  return (
    <div style={{ marginTop: showPravas ? "48px" : "" }}>
      {showPravas && <h2>Pravas</h2>}

      <Outlet />
    </div>
  );
};

export default Pravas;
