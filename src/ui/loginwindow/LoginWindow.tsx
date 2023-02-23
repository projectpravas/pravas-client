import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import LoginCard from "../../features/frontend/auth/LoginCard";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../app/slices/AuthSlice";
import UserModel from "../../shared/models/userModel";

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

interface LoginWindowProps {
  open: boolean;
  handleClose: Function;
  handleOpen: Function;
}

const LoginWindow: React.FC<LoginWindowProps> = ({
  handleClose,
  handleOpen,
  open,
}) => {
  const currentLoggedUser: UserModel = useSelector(selectLoggedUser);

  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };
  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  React.useEffect(() => {
    currentLoggedUser?._id && handleClose();
  }, [currentLoggedUser]);

  return (
    <div>
      <BootstrapDialog
        onClose={() => handleClose()}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers>
          <IconButton
            aria-label="close"
            onClick={() => handleClose()}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <LoginCard />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default LoginWindow;
