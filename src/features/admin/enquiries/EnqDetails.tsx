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
import { Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IEnqDetailsProps {
  openDialog: boolean;
  handleDialogOpen: Function;
  handleDialogClose: Function;
  rowData?: EnquiryModel;
}

const EnqDetails: React.FunctionComponent<IEnqDetailsProps> = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setOpen(props.openDialog);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={props.openDialog} maxWidth="md">
        <Grid container justifyContent="space-between">
          <Grid item>
            <DialogTitle>Enquiry Details</DialogTitle>
          </Grid>
          <Grid item>
            <IconButton onClick={() => props.handleDialogClose()}>
              <CloseIcon fontSize="large" color="error" />
            </IconButton>
          </Grid>
        </Grid>

        <DialogContent>
          <CustomTourForm rowData={props?.rowData} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnqDetails;
