import React from "react";
import { Outlet } from "react-router-dom";
import CustomTitle from "../../../ui/title/CustomTitle";
import Button from "@mui/material/Button";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface IBookingsProps {}

const Bookings: React.FunctionComponent<IBookingsProps> = (props) => {
  return (
    <>
      {/* <h1>Bookings</h1> */}
      <CustomTitle title="Bookings" />

      <Outlet />
    </>
  );
};

export default Bookings;
