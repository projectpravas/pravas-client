import * as React from "react";
import CareerDetails from "../../../ui/footer/Career/CareerDetails";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <>
      <h2>Home</h2>
      <CareerDetails />
    </>
  );
};

export default Home;
