import * as React from "react";
import PersistedSidebar from "./PersistedSidebar";
import Sidebar from "./Sidebar";

interface IFullLayoutProps {}

const FullLayout: React.FunctionComponent<IFullLayoutProps> = (props) => {
  return (
    <>
      <Sidebar />
      {/* <PersistedSidebar /> */}
    </>
  );
};

export default FullLayout;
