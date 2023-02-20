import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import CustomTitle from "../../../ui/title/CustomTitle";
import Button from "@mui/material/Button";

import handlePayment from "../../../shared/razor-pay/razorPay-payment";
import BookingService from "../../../services/BookingService";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface IBookingsProps {}

const Bookings: React.FunctionComponent<IBookingsProps> = (props) => {
  const [dates, setDates] = useState({ from: "", to: "" });

  const getPaymentHistory = (from: string, to: string, last: number) => {
    const fromDate = new Intl.DateTimeFormat("en-US").format(new Date(from));
    const toDate = new Intl.DateTimeFormat("en-US").format(
      new Date(
        new Date(`${to}`).setDate(new Date(`${to}`).getDate() + Number(`${1}`))
      )
    );

    BookingService.getPaymentHistory({ from: fromDate, to: toDate, last: last })
      .then((res) => {
        console.log(res?.data?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {/* <h1>Bookings</h1> */}
      <CustomTitle title="Bookings" />

      <button onClick={() => handlePayment("100", "07", "01")}>Book now</button>
      <input
        type="date"
        onChange={(e: any) => setDates({ ...dates, from: e?.target?.value })}
      />
      <input
        type="date"
        onChange={(e: any) => setDates({ ...dates, to: e?.target?.value })}
      />

      <button onClick={() => getPaymentHistory(dates?.from, dates?.to, 50)}>
        Payment History
      </button>

      <Outlet />
    </>
  );
};

export default Bookings;
