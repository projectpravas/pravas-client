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
      <Button variant="outlined">Open form dialog</Button>
      <Dialog open={props.openDialog} maxWidth="md">
        <DialogTitle>Enquiry Details</DialogTitle>
        <DialogContent>
          <CustomTourForm rowData={props?.rowData} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => props.handleDialogClose()}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EnqDetails;
