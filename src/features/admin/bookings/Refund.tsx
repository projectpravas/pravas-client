import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import BookingService from "../../../services/BookingService";
import Button from "@mui/material/Button";
import { set } from "react-hook-form";
import { errorToast, successToast } from "../../../ui/toast/Toast";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

interface RefundProps {
  open: boolean;
  handleRefundWindow: Function;
  refundData: any;
}

const Refund: React.FC<RefundProps> = ({
  handleRefundWindow,
  open,
  refundData,
}) => {
  const [touched, setTouched] = useState({ refundAmount: false });
  const [refundAmount, setRefundAmount] = useState("");

  const handleRefund = () => {
    BookingService.refund({ pId: refundData?.pId, amount: refundAmount })
      .then((res) => {
        if (res?.data?.data?.status == "processed") {
          successToast("Payment Refunded Successfully...", 3000);
        } else if (res?.data?.data?.status == "pending") {
          successToast(
            "Payment is in proccess... will be refunded Successfully...",
            3000
          );
        } else if (res?.data?.data?.status == "failed") {
          errorToast("Payment Refund failed...", 5000);
        }
      })
      .catch((err) => {
        console.error(err);
        errorToast("Payment Refund failed...", 5000);
      });
  };

  return (
    <div style={{ display: "flex", width: "100%", padding: "16px" }}>
      <BootstrapDialog
        onClose={() => handleRefundWindow(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
      >
        <Grid container justifyContent="center">
          <DialogTitle>Refund</DialogTitle>
        </Grid>
        <Divider />
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={() => handleRefundWindow(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Grid container justifyContent="space-evenly" my={2}>
            <Grid
              item
              xs={10}
              justifyContent="center"
              flexWrap="nowrap"
              sx={{ m: 2 }}
            >
              <Grid container justifyContent="space-between">
                <Grid item xs={4} justifyContent="left">
                  Tour Name:
                </Grid>
                <Grid item xs={6} justifyContent="left">
                  {refundData?.tourTitle}
                </Grid>
                <Grid item xs={4} justifyContent="left">
                  Tour Date:
                </Grid>
                <Grid item xs={6} justifyContent="left">
                  {refundData?.tourDate
                    ? new Intl.DateTimeFormat("en-IN").format(
                        new Date(refundData?.tourDate)
                      )
                    : ""}
                </Grid>
                <Grid item xs={4} justifyContent="left">
                  Payee Name:
                </Grid>
                <Grid item xs={6} justifyContent="left">
                  {refundData?.name}
                </Grid>
                <Grid item xs={4} justifyContent="left">
                  Paid Amount:
                </Grid>
                <Grid item xs={6} justifyContent="left">
                  {refundData?.amount}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sx={{ mt: 4 }}>
              <TextField
                fullWidth
                type="text"
                size="small"
                id="refund-amount"
                label="Refund Amount"
                InputLabelProps={{ shrink: refundAmount ? true : false }}
                onBlur={() => setTouched({ ...touched, refundAmount: true })}
                onFocus={() => setTouched({ ...touched, refundAmount: true })}
                onChange={(e: any) => setRefundAmount(e?.target?.value)}
                error={
                  touched?.refundAmount &&
                  (Number(refundAmount) == 0 ||
                    refundAmount == "" ||
                    Number(refundData?.amount) < Number(refundAmount))
                    ? true
                    : false
                }
                helperText={
                  touched?.refundAmount &&
                  (Number(refundAmount) == 0 ||
                    refundAmount == "" ||
                    Number(refundData?.amount) < Number(refundAmount))
                    ? `Please Check Refund Amount..`
                    : ""
                }
              />
            </Grid>

            <Grid item xs={2} sx={{ mt: 4 }}>
              <Button
                type="button"
                variant="contained"
                sx={{ mb: 2 }}
                disabled={
                  touched?.refundAmount &&
                  (Number(refundAmount) == 0 ||
                    refundAmount == "" ||
                    Number(refundData?.amount) < Number(refundAmount))
                    ? true
                    : false
                }
                onClick={() => handleRefund()}
              >
                Refund
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default Refund;
