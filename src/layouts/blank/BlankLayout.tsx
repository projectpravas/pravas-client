import * as React from "react";
import Footer from "../../ui/footer/Footer";
import Header from "./Header";

interface IBlankLayoutProps {}

const BlankLayout: React.FunctionComponent<IBlankLayoutProps> = (props) => {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default BlankLayout;
