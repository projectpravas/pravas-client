import * as React from "react";
import { Outlet } from "react-router-dom";

interface IBookingsProps {}

const Bookings: React.FunctionComponent<IBookingsProps> = (props) => {
  return (
    <>
      <h1>Bookings</h1>
      <Outlet />
    </>
  );
};

export default Bookings;
