import React from "react";
import { Outlet } from "react-router-dom";

import handlePayment from "../../../shared/razor-pay/razorPay-payment";

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

      <button onClick={() => handlePayment("100", "", "")}>Book now</button>

      <Outlet />
    </>
  );
};

export default Bookings;
