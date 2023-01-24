import * as React from "react";
import Footer from "../../ui/footer/Footer";
import Sidebar from "./Sidebar";

interface IFullLayoutProps {}

const FullLayout: React.FunctionComponent<IFullLayoutProps> = (props) => {
  return (
    <>
      <Sidebar />
      <Footer />
    </>
  );
};

export default FullLayout;
