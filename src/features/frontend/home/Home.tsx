import * as React from "react";
import CareerForm from "../../../ui/footer/CareerForm";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <>
      <h2>Home</h2>
      <CareerForm />
    </>
  );
};

export default Home;
