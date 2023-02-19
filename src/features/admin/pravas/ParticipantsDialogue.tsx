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
  const [ids, setIds] = useState<string[]>([]);
  const [fetchedNames, setfetchedNames] = useState<string[]>([]);
  const [maxAllowedParticipants, setMaxAllowedParticipants] = useState(0);
  const [participants, setParticipants] = useState<any[]>([""]);
  const [touched, setTouched] = useState({ mob: false });
  const [mobile, setMobile] = useState("");
  const [fieldFocused, setFieldFocused] = useState(false);

  const [searchResult, setSearchResult] = useState<any[]>([]);

  const handleClose = () => {
    handleDialogue({ ...values, flag: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e?.target;
    const idNameArr = fetchedParticipants.map((val) => val.split("/")[0]);
    const paymentMethodArr = fetchedParticipants.map(
      (value) => value.split("/")[1]
    );

    idNameArr[i] = value;
    const arr = [];

    for (let j = 0; j < fetchedParticipants.length; j++) {
      arr.push(
        `${idNameArr[j]}/${
          paymentMethodArr[j] ? paymentMethodArr[j] : "offline"
        }`
      );
    }

    setFetchedParticipants(arr);
  };

  const setValidNames = (arr: string[]) => {
    UserService.isValidIds(arr)
      .then((res) => {
        const resArr: string[] = [];
        res?.data?.data?.map((val: any) => {
          if (typeof val === "object") {
            resArr.push(`${val?.name?.first} ${val?.name?.last}`);
          } else {
            resArr.push(val);
          }
        });
        setfetchedNames(resArr);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getUsers = (mob: number | string) => {
    UserService.fetchAllUsers(`?mobile=${mob}`)
      .then((res) => {
        const arr = fetchedParticipants;
        const result = res?.data?.data;
        const index = res?.data?.data?.find((obj: any, i: any) => {
          if (arr.includes(obj?._id)) return i;
        });
        result.splice(index, 1);

        setSearchResult(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    if (mobile?.length > 1) getUsers(value);
    else if (value == "") {
      setSearchResult([]);
    }
    setMobile(value);
  };

  const addBtnHandleChange = () => {
    setFetchedParticipants([...fetchedParticipants, ""]);
  };

  const addParticipantsFromDb = async (userObj: any) => {
    const arr = participants;

    const userIdExist = arr?.find(
      (obj) => obj?.id?.split("/")[0] == userObj?._id
    )?.id;

    if (!userIdExist && maxAllowedParticipants > fetchedParticipants?.length) {
      setFetchedParticipants([
        ...fetchedParticipants,
        `${userObj?._id}/offline`,
      ]);

      const idsArr = ids;
      idsArr.push(userObj?._id);
      setIds(idsArr);
    }
  };

  useEffect(() => {
    TourService.fetchOneTour(values?.id)
      .then((res) => {
        setMaxAllowedParticipants(Number(res?.data?.data?.maxPersons));
        setFetchedParticipants(res?.data?.data?.participants);
        const idNamesArr = res?.data?.data?.participants.map(
          (val: any) => val.split("/")[0]
        );
        // setIds(idNamesArr);
        setValidNames(idNamesArr);
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
            return { id: val };
          })
        : [{ id: "" }];

    setParticipants(arr);

    const idsArr = [];

    for (let i = 0; i < fetchedParticipants.length; i++) {
      // if (fetchedParticipants[i].split("/")[1] == "offline") {
      //   const resArr = fetchedNames;
      //   resArr.splice(i, 1, `${fetchedParticipants[i]}`);
      //   setfetchedNames(resArr);
      // }
      idsArr.push(fetchedParticipants[i].split("/")[0]);
    }

    // setIds(idsArr);
    // setValidNames(idsArr);
  }, [fetchedParticipants, ids]);

  // useEffect(() => {
  //   setValidNames(ids);
  // }, [ids]);

  // useEffect(() => {
  //   setValidNames(ids);
  // }, [ids]);

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
        <DialogContent dividers className="hideScrollbar">
          {/* // Add participant from db */}
          <Grid container>
            <Grid item xs={12}>
              <TextField
                size="small"
                type="text"
                name="mobile"
                label="Serach"
                placeholder="Search By Mobile Number"
                value={mobile}
                disabled={
                  maxAllowedParticipants > fetchedParticipants?.length
                    ? false
                    : true
                }
                inputProps={{
                  min: 0,
                }}
                onBlur={() =>
                  !touched?.mob && setTouched({ ...touched, mob: true })
                }
                onChange={handleMobileChange}
                error={
                  touched?.mob && mobile?.length > 10 && !Number.isNaN(mobile)
                    ? true
                    : false
                }
                helperText={
                  touched?.mob && mobile?.length > 10 && !Number.isNaN(mobile)
                    ? "Invalid Input"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                className="hideScrollbar"
                style={{
                  maxHeight: "200px",
                }}
                sx={{
                  mt: { xs: 1, sm: 2 },
                  border: "1px solid #000",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderSpacing: "0px",
                    margin: "0px",
                  }}
                >
                  <tr style={{ fontWeight: 100 }}>
                    <th
                      style={{
                        border: "1px solid gray",
                        padding: "4px 0",
                        fontWeight: 100,
                      }}
                    >
                      Name
                    </th>
                    <th
                      style={{
                        border: "1px solid gray",
                        padding: "4px 0",
                        width: "40%",
                        fontWeight: 100,
                      }}
                    >
                      Email
                    </th>
                    <th
                      style={{
                        border: "1px solid gray",
                        padding: "4px 0",
                        width: "20%",
                        fontWeight: 100,
                      }}
                    >
                      Add
                    </th>
                  </tr>
                  {Array.isArray(searchResult) &&
                    maxAllowedParticipants > fetchedParticipants?.length &&
                    searchResult.map((obj: any, i: number) => {
                      return (
                        <tr
                          key={obj?._id}
                          style={{
                            border: "1px solid gray",
                            padding: "5px",
                          }}
                        >
                          <td
                            style={{
                              border: "1px solid gray",
                              padding: "5px 15px",
                              fontSize: "0.91em",
                            }}
                          >
                            {`${obj.name?.first} ${obj.name?.last}`}
                          </td>
                          <td
                            style={{
                              border: "1px solid gray",
                              padding: "5px 15px",
                              fontSize: "0.9em",
                            }}
                          >
                            {obj?.email}
                          </td>
                          <td
                            style={{
                              border: "1px solid gray",
                              padding: "5px 15px",
                            }}
                          >
                            <IconButton
                              color="primary"
                              onClick={() => addParticipantsFromDb(obj)}
                              disabled={
                                maxAllowedParticipants >
                                fetchedParticipants?.length
                                  ? ids.includes(obj?._id)
                                  : true
                              }
                            >
                              <AddIcon />
                            </IconButton>
                          </td>
                        </tr>
                      );
                    })}
                </table>
              </Box>
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
                              InputLabelProps={{
                                shrink:
                                  fetchedParticipants[index] != "" ||
                                  fieldFocused,
                              }}
                              onFocus={() => setFieldFocused(true)}
                              onBlur={() => setFieldFocused(false)}
                              disabled={
                                fetchedParticipants[index]?.split("/")[1] ==
                                "online"
                              }
                              value={fetchedNames[index]?.split("/")[0]}
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
                                  disabled={
                                    fetchedParticipants[index]?.split("/")[1] ==
                                      "online" || participants?.length == 1
                                  }
                                  onClick={() => {
                                    setFetchedParticipants(
                                      fetchedParticipants.filter(
                                        (v, i) => i != index
                                      )
                                    );
                                    setfetchedNames(
                                      fetchedNames.filter((v, i) => i != index)
                                    );
                                  }}
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
                                    disabled={
                                      maxAllowedParticipants <= index + 1
                                        ? true
                                        : false
                                    }
                                    color="primary"
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
