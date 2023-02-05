import * as React from "react";
import { Helmet } from "react-helmet";

interface IPravasProps {}

const Pravas: React.FunctionComponent<IPravasProps> = (props) => {
  return (
    <>
      <Helmet>
        <title>Pravas Tours</title>
        <meta name="description" content="Pravas Tourism" />
        <meta name="keywords" content="Pravas Tourism" />
      </Helmet>
    </>
  );
};

export default Pravas;
