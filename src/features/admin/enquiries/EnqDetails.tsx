import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CustomTourForm from "../../frontend/customtourform/CustomTourForm";
import EnquiryModel from "../../../shared/models/enquiryModel";
import { Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Lable from "@mui/material/FormLabel";
import moment from "moment";

interface IEnqDetailsProps {
  openDialog: boolean;
  handleDialogOpen: Function;
  handleDialogClose: Function;
  rowData?: EnquiryModel;
}

const EnqDetails: React.FunctionComponent<IEnqDetailsProps> = (props) => {
  return (
    <div style={{ width: "100%" }}>
      <Dialog open={props.openDialog} maxWidth="md" fullWidth>
        <Grid container justifyContent="space-between">
          <Grid item>
            <DialogTitle>Enquiry Details</DialogTitle>
          </Grid>
          <Grid item>
            <IconButton>
              <PrintIcon
                onClick={() => window.print()}
                fontSize="large"
                color="primary"
              />
            </IconButton>

            <IconButton onClick={() => props.handleDialogClose()}>
              <CloseIcon fontSize="large" color="error" />
            </IconButton>
          </Grid>
        </Grid>

        <DialogContent>
          {/* <CustomTourForm rowData={props?.rowData} /> */}
          <Grid container flexDirection="column">
            <Grid item>
              <Typography>
                Destinations:
                <span>
                  {" "}
                  {props?.rowData?.destinations?.map((v, i) => {
                    return <>{"" + v.place + ", "}</>;
                  })}
                </span>
              </Typography>
            </Grid>
            <Divider />
            <Typography>Travel Dates:</Typography>
            <Grid item>
              <Grid container>
                <Typography paddingRight={3}>
                  <span>From :</span>
                  <span>
                    {moment(props?.rowData?.travelDates?.from)
                      .format("DD-MM-YYYY")
                      .toString()}
                  </span>
                </Typography>
                <Typography paddingRight={3}>
                  <span> To :</span>
                  <span>
                    {moment(props?.rowData?.travelDates?.to)
                      .format("DD-MM-YYYY")
                      .toString()}
                  </span>
                </Typography>
                <Typography paddingRight={3}>
                  <span> Days :</span>
                  <span>{props?.rowData?.travelDuration}</span>
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Typography>Participants:</Typography>
            <Grid item>
              <Grid container>
                <Typography paddingRight={3}>
                  {props?.rowData?.participants?.map((v, i) => (
                    <div>
                      <span style={{ marginRight: "1em" }}>
                        Name: {v?.name}
                      </span>
                      <span>Age: {v.age}</span>
                    </div>
                  ))}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Typography>Contact Details:</Typography>
            <Grid item>
              <Grid container>
                <Typography paddingRight={3}>
                  <span>Contact Person Name :</span>
                  <span> {props?.rowData?.contactPersonName}</span>
                </Typography>
                <Typography paddingRight={3}>
                  <span> Mobile :</span>
                  <span> {props?.rowData?.contactPersonMobile}</span>
                </Typography>
                <Typography paddingRight={3}>
                  <span> Email :</span>
                  <span> {props?.rowData?.contactPersonEmail}</span>
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Typography>Hotel Requirements:</Typography>
            <Grid item>
              <Grid container>
                <Typography paddingRight={3}>
                  <span>Hotel Category :</span>
                  <span> {props?.rowData?.hotelCategory}</span>
                </Typography>
                <Typography paddingRight={3}>
                  <span> Meals :</span>

                  <span>
                    {" "}
                    Breakfast :{" "}
                    {props?.rowData?.meals?.breakfast ? "Yes" : "No"},
                  </span>
                  <span>
                    {" "}
                    Lunch : {props?.rowData?.meals?.lunch ? "Yes" : "No"},
                  </span>
                  <span>
                    {" "}
                    Dinner : {props?.rowData?.meals?.dinner ? "Yes" : "No"}
                  </span>
                </Typography>
                <Typography paddingRight={3}>
                  <span> Rooms :</span>
                  <span> {props?.rowData?.rooms}</span>
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Typography>Anything Else:</Typography>
            <Grid item>
              <Grid container>
                <Typography paddingRight={3}>
                  <span> {props?.rowData?.anythingElse}</span>
                </Typography>
              </Grid>
            </Grid>
            <Divider />
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnqDetails;
