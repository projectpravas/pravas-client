import * as React from "react";
import { Helmet } from "react-helmet";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <>
      <Helmet>
        <title>Pravas Tourism</title>
        <meta name="description" content="Pravas Tourism" />
        <meta name="keywords" content="Pravas Tourism" />
      </Helmet>
      <h2>Home</h2>
    </>
  );
};

export default Home;
