import * as React from "react";
import { Outlet } from "react-router-dom";

interface IQuotesProps {}

const Quotes: React.FunctionComponent<IQuotesProps> = (props) => {
  return (
    <>
      <h1>Quotes</h1>
      <Outlet />
    </>
  );
};

export default Quotes;
