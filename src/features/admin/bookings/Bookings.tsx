import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CustomTitle from "../../../ui/title/CustomTitle";
import BookingService from "../../../services/BookingService";
import MUIDataTable from "mui-datatables";
import Box from "@mui/material/Box";
import TourService from "../../../services/TourService";
import TourModel from "../../../shared/models/tourModel";
import UserService from "../../../services/UserService";
import UserModel from "../../../shared/models/userModel";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import Refund from "./Refund";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface IBookingsProps {}

const Bookings: React.FunctionComponent<IBookingsProps> = (props) => {
  const [refundWindow, setRefundWindow] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [dates, setDates] = useState({ from: "", to: "", mobile: "" });
  const [refundData, setRefundData] = useState({
    pId: "",
    amount: "",
    tourTitle: "",
    tourDate: "",
    name: "",
  });

  const getPaymentHistory = (
    from: string | Date,
    to: string | Date,
    last: string
  ) => {
    !from &&
      (from = new Date(
        new Date(
          new Date().setDate(new Date(Date.now()).getDate() - Number(30))
        )
      ));

    !to && (to = new Date());
    !last && (last = "100");

    const fromDate = new Intl.DateTimeFormat("en-US").format(new Date(from));
    const toDate = new Intl.DateTimeFormat("en-US").format(
      new Date(
        new Date(`${to}`).setDate(new Date(`${to}`).getDate() + Number(`${1}`))
      )
    );

    BookingService.getPaymentHistory({
      from: fromDate,
      to: toDate,
      last: Number(last),
    })
      .then((res) => {
        const response = res?.data?.data;
        const dataList: any = [];

        response.forEach(async (ele: any) => {
          const dataObj: any = {};

          dataObj.paymentId = ele?.id;
          dataObj.tourTitle = ele?.notes?.tourTitle
            ? ele?.notes?.tourTitle
            : "";

          dataObj.tourDate = ele?.notes?.tourDate
            ? new Intl.DateTimeFormat("en-IN").format(
                new Date(ele?.notes?.tourDate.toString())
              )
            : "";
          dataObj.mobile = ele?.contact;

          dataObj.paymentDate = Number(ele?.notes?.paymentTime)
            ? new Intl.DateTimeFormat("en-IN").format(
                Number(ele?.notes?.paymentTime)
              )
            : "";

          dataObj.name = ele?.notes?.name ? `${ele?.notes?.name}` : "";
          dataObj.paidAmount = ele?.amount;
          dataObj.status = ele?.status;
          dataList.push(dataObj);
        });
        setData(dataList);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const columns = [
    {
      label: "ID",
      name: "paymentId",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (index: any, metaData: any) => {
          return index + 1;
        },
      },
    },
    {
      label: "Tour Title",
      name: "tourTitle",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Tour Date",
      name: "tourDate",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Payee Name",
      name: "name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Mobile",
      name: "mobile",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Payment Date",
      name: "paymentDate",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Amount",
      name: "paidAmount",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => {
          return value / 100;
        },
      },
    },
    {
      label: "Status",
      name: "status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any) => {
          return value;
        },
      },
    },
    {
      label: "Refund",
      name: "refund",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string, metaData: any) => {
          const rowData = data[metaData.rowIndex];

          return (
            <Box sx={{ display: "flex" }}>
              <IconButton
                disabled={rowData?.status == "refunded" ? true : false}
                onClick={() => {
                  setRefundData({
                    pId: rowData?.paymentId,
                    tourTitle: rowData?.tourTitle,
                    tourDate: rowData?.tourDate,
                    name: rowData?.name,
                    amount: String(rowData?.paidAmount / 100),
                  });
                  setRefundWindow(true);
                }}
              >
                <RemoveCircleRoundedIcon
                  style={{
                    color: rowData?.status == "refunded" ? "#444" : "red",
                  }}
                />
              </IconButton>
            </Box>
          );
        },
      },
    },
  ];

  const options: object = {
    filterType: "dropDown",
    responsive: "standard",
    enableNestedDataAccess: ".",
  };

  useEffect(() => {
    getPaymentHistory("", "", "");
  }, []);

  return (
    <>
      <CustomTitle title="Bookings" />
      <Refund
        handleRefundWindow={setRefundWindow}
        open={refundWindow}
        refundData={refundData}
      />
      <Grid container spacing={2} sx={{ m: 2, alignItems: "center" }}>
        <Grid item>
          <TextField
            size="small"
            type="date"
            id="from"
            label="From"
            InputLabelProps={{
              shrink: true,
            }}
            value={dates?.from}
            onChange={(e: any) =>
              setDates({ ...dates, from: e?.target?.value })
            }
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            type="date"
            id="to"
            label="To"
            InputLabelProps={{
              shrink: true,
            }}
            value={dates?.to}
            onChange={(e: any) => setDates({ ...dates, to: e?.target?.value })}
          />
        </Grid>
        {/* <Grid sx={{ verticalAlign: "middle", pt: 2, pl: 2 }}>
          <span>OR</span>
        </Grid>
        <Grid item>
          <TextField
            size="small"
            type="text"
            id="mobile"
            label="mobile"
            value={dates?.mobile}
            onChange={(e: any) =>
              setDates({ ...dates, mobile: e?.target?.value })
            }
          />
        </Grid> */}
        <Grid pt={2} pl={2}>
          <Button
            type="button"
            variant="contained"
            id="submit"
            onClick={() => {
              getPaymentHistory(dates?.from, dates?.to, "50");
            }}
          >
            Get History
          </Button>
        </Grid>
      </Grid>
      <MUIDataTable
        title="Payments"
        columns={columns}
        data={data}
        options={options}
      />

      <Outlet />
    </>
  );
};

export default Bookings;
