import React from "react";
import { Outlet } from "react-router-dom";

declare global {
  interface Window {
    Razorpay: any;
  }
}

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
