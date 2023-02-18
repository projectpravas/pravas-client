import React, { useState, useEffect, ReactElement } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TourService from "../../../services/TourService";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import UserService from "../../../services/UserService";

interface IPaerticipantsDialogue {
  values: {
    flag: boolean;
    id: string;
  };
  handleDialogue: Function;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  textAlign: "center",
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

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const ParticipantsDialogue: React.FunctionComponent<IPaerticipantsDialogue> = ({
  values,
  handleDialogue,
}) => {
  const [fetchedParticipants, setFetchedParticipants] = useState<string[]>([]);
  const [participants, setParticipants] = useState<any[]>([""]);
  const [touched, setTouched] = useState({ mob: false });
  const [mobile, setMobile] = useState("");

  const [searchResult, setSearchResult] = useState<any[]>([]);

  const handleClose = () => {
    handleDialogue({ ...values, flag: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e?.target;
    const arr = [...fetchedParticipants];
    arr[i] = value;

    setFetchedParticipants(arr);
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    if (mobile?.length > 3) getUsers(value);
    if (mobile?.length == 9) {
      setTouched({ ...touched, mob: false });
    }
    setMobile(value);
  };

  const getUsers = (mob: number | string) => {
    console.log(mob);

    UserService.fetchAllUsers(`?mobile=${mob}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addBtnHandleChange = () => {
    setFetchedParticipants([...fetchedParticipants, ""]);
  };

  useEffect(() => {
    TourService.fetchOneTour(values?.id)
      .then((res) => {
        setFetchedParticipants(res?.data?.data?.participants);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (fetchedParticipants?.length == 0) fetchedParticipants.push("");
    const arr =
      Array.isArray(fetchedParticipants) && fetchedParticipants?.length > 0
        ? fetchedParticipants?.map((val) => {
            return { name: val };
          })
        : [{ name: "" }];

    setParticipants(arr);
  }, [fetchedParticipants]);

  return (
    <Box sx={{ maxWidth: "70%" }}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="participants-dialog-title"
        open={values?.flag}
      >
        <BootstrapDialogTitle
          id="participants-dialog-title"
          onClose={handleClose}
        >
          Add Participants
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {/* // Add participant from db */}
          <Grid container>
            <Grid item xs={8}>
              <TextField
                size="small"
                type="text"
                // autoFocus
                name="mobile"
                label="Serach"
                placeholder="Search By Mobile Number"
                value={mobile}
                inputProps={{
                  min: 0,
                }}
                onBlur={() =>
                  mobile?.length != 10 && setTouched({ ...touched, mob: true })
                }
                onChange={handleMobileChange}
                error={touched?.mob && !Number.isNaN(mobile) ? true : false}
                helperText={
                  touched?.mob && !Number.isNaN(mobile) ? "Invalid Input" : ""
                }
              />
            </Grid>
            <Grid>
              <ul>
                <li></li>
              </ul>
              {/* <Button onClick={"method"}>Add</Button> */}
            </Grid>
          </Grid>
          <Box>
            <form
              onSubmit={(e) => {
                e?.preventDefault();
                console.log(fetchedParticipants);
              }}
            >
              <Grid
                sx={{
                  p: 2,
                  display: { xs: "block", sm: "grid" },
                  gridTemplateColumns:
                    participants?.length == 1 ? "1fr 100%" : "1fr 50%",
                }}
              >
                <>
                  {Array.isArray(participants) &&
                    participants?.map((participant, index) => (
                      <React.Fragment key={participant + index}>
                        <Grid
                          justifyContent="space-evenly"
                          sx={{
                            display: "flex",
                            width:
                              Number(participants?.length) == 1
                                ? "300px"
                                : "auto",
                          }}
                        >
                          <Grid item xs={9} sx={{ width: { xs: "80%" }, p: 2 }}>
                            <TextField
                              key={index}
                              fullWidth
                              required
                              size="small"
                              name={`participant-${index + 1}`}
                              id="participants"
                              label={`participant-${index + 1}`}
                              value={fetchedParticipants[index]}
                              onChange={(e: any) => {
                                handleChange(e, index);
                              }}
                            />
                          </Grid>

                          <Grid
                            item
                            xs={3}
                            sx={{
                              py: 2,
                              maxWidth: "140px",
                              width: { xs: "10%", md: "20%" },
                            }}
                          >
                            <Grid
                              container
                              justifyContent={"start"}
                              flexWrap="nowrap"
                            >
                              <Grid
                                item
                                xs={12}
                                md={5}
                                sx={{
                                  textAlign: "start",
                                }}
                              >
                                <IconButton
                                  color="warning"
                                  disabled={participants?.length == 1}
                                  onClick={() =>
                                    setFetchedParticipants(
                                      fetchedParticipants.filter(
                                        (v, i) => i != index
                                      )
                                    )
                                  }
                                >
                                  <ClearIcon />
                                </IconButton>
                              </Grid>
                              {participants?.length == index + 1 && (
                                <Grid
                                  item
                                  xs={12}
                                  md={5}
                                  sx={{ textAlign: "center" }}
                                >
                                  <IconButton
                                    color="primary"
                                    // onClick={() => {
                                    //   const arr: any = fetchedParticipants;
                                    //   arr.push({ name: "" });
                                    //   setFetchedParticipants(arr);
                                    // }}
                                    onClick={addBtnHandleChange}
                                  >
                                    <AddIcon />
                                  </IconButton>
                                </Grid>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </React.Fragment>
                    ))}
                </>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button type="submit" variant="contained">
                  Submit Participants
                </Button>
              </Grid>
            </form>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </Box>
  );
};

export default ParticipantsDialogue;
