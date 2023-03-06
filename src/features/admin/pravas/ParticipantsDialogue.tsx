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
import Swal from "sweetalert2";
import { errorToast, successToast } from "../../../ui/toast/Toast";
import TourModel from "../../../shared/models/tourModel";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

interface IPaerticipantsDialogue {
  values: {
    flag: boolean;
    id: string;
  };
  handleDialogue: Function;
  status: string;
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
  status,
}) => {
  const [fetchedParticipants, setFetchedParticipants] = useState<string[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [fetchedNames, setfetchedNames] = useState<any[]>([]);
  const [maxAllowedParticipants, setMaxAllowedParticipants] = useState(0);
  const [participants, setParticipants] = useState<any[]>([]);
  const [touched, setTouched] = useState({ mob: false });
  const [mobile, setMobile] = useState("");
  const [fieldFocused, setFieldFocused] = useState(false);
  const [editForm, setEditForm] = useState(false);

  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [tourDetails, setTourDetails] = useState<TourModel>();

  const handleClose = () => {
    handleDialogue({ ...values, flag: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e?.target;

    const newArr = [...participants];
    newArr.splice(i, 1, {
      id: `${value}/${participants[i]?.id?.split("/")[1]}`,
    });
    setParticipants(newArr);
  };

  const setValidNames = (arr: string[]) => {
    UserService.isValidIds(arr)
      .then((res) => {
        const data = res?.data?.data;
        setfetchedNames(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getUsers = (mob: number | string) => {
    mob
      ? UserService.fetchAllUsers(`?mobile=${mob}`)
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
          })
      : setSearchResult([]);
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    if (mobile?.length > 1) getUsers(value);
    else if (!value) {
      setSearchResult([]);
    }
    console.log(value);

    setMobile(value);
  };

  const addBtnHandleChange = () => {
    setParticipants([...participants, { id: "/offline" }]);
    setfetchedNames([...fetchedNames, ""]);
    setIds([...ids, ""]);
  };

  const addParticipantsFromDb = (userObj: any) => {
    const arr = participants;

    const userIdExist = arr?.find(
      (obj) => obj?.id?.split("/")[0] == userObj?._id
    )?.id;

    if (!userIdExist && maxAllowedParticipants > fetchedParticipants?.length) {
      UserService.addRemoveTourId({
        userId: userObj?._id,
        op: "add",
        tourId: values?.id,
      })
        .then((res) => {
          setParticipants([
            ...participants,
            { id: `${userObj?._id}/offline/added` },
          ]);

          const idsArr = ids;
          idsArr.push(userObj?._id);
          setIds(idsArr);

          setfetchedNames([...fetchedNames, userObj]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleDelete = (index: string | number) => {
    Swal.fire({
      target: document.getElementById(
        "participant-modal-dialog"
      ) as unknown as string,
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (typeof fetchedNames[Number(index)] === "object") {
          UserService.addRemoveTourId({
            userId: fetchedNames[Number(index)]?._id,
            op: "remove",
            tourId: values?.id,
          })
            .then((res) => {
              setParticipants(participants.filter((v, i) => i != index));
              setfetchedNames(fetchedNames.filter((v, i) => i != index));
              setIds(ids.filter((v, i) => i != index));
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          setParticipants(participants.filter((v, i) => i != index));
          setfetchedNames(fetchedNames.filter((v, i) => i != index));
          setIds(ids.filter((v, i) => i != index));
        }
      }
    });
  };

  useEffect(() => {
    setEditForm(status == "upcoming" ? true : false);
    TourService.fetchOneTour(values?.id)
      .then((res) => {
        setTourDetails(res?.data?.data);
        setMaxAllowedParticipants(Number(res?.data?.data?.maxPersons));
        const idNamesArr = res?.data?.data?.participants.map(
          (val: any) => val.split("/")[0]
        );
        const arr =
          Array.isArray(res?.data?.data?.participants) &&
          res?.data?.data?.participants?.length > 0
            ? res?.data?.data?.participants?.map((val: any) => {
                return { id: val };
              })
            : [{ id: "" }];

        setParticipants(arr);
        setIds(idNamesArr);
        setValidNames(idNamesArr);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (participants?.length == 0) participants.push({ id: "" });

    const arr =
      Array.isArray(participants) && participants?.length > 0
        ? participants?.map((val) => {
            return val?.id;
          })
        : [""];

    setFetchedParticipants(arr);
  }, [participants]);

  useEffect(() => {
    if (!editForm) {
      const idNamesArr = fetchedParticipants.map(
        (val: any) => val.split("/")[0]
      );
      setValidNames(idNamesArr);
    }
  }, [editForm]);

  useEffect(() => {
    setParticipants(participants);
  }, [fetchedNames]);

  return (
    <Box>
      <BootstrapDialog
        maxWidth="md"
        fullWidth
        id="participant-modal-dialog"
        onClose={handleClose}
        aria-labelledby="participants-dialog-title"
        open={values?.flag}
      >
        <BootstrapDialogTitle
          id="participants-dialog-title"
          onClose={handleClose}
        >
          <Grid container justifyContent="center">
            <Grid
              item
              xs={12}
              sm={4}
              sx={{ textAlign: { xs: "center", sm: "start" } }}
            >
              Tour Name :
              <span
                style={{ fontSize: "0.9em" }}
              >{`  ${tourDetails?.title}`}</span>
            </Grid>
            <Grid item xs={12} sm={4}>
              {editForm ? "Add Participants" : "Tour Participants"}
            </Grid>
            <Grid item xs={12} sm={4}>
              {`${"start Date :"} `}
              <span style={{ fontSize: "0.9em" }}>
                {new Intl.DateTimeFormat("en-IN").format(
                  new Date(
                    `${
                      tourDetails?.tourDate ? tourDetails?.tourDate : new Date()
                    }`
                  )
                )}
              </span>
            </Grid>
          </Grid>
        </BootstrapDialogTitle>
        <DialogContent
          sx={{ position: "relative" }}
          dividers
          className="hideScrollbar"
        >
          {/* // Add participant from db */}
          <Grid container>
            {!editForm && (
              <IconButton
                sx={{ position: "absolute", top: 1, right: 2 }}
                color="primary"
                onClick={() => window.print()}
              >
                <LocalPrintshopIcon />
              </IconButton>
            )}
            {editForm ? (
              <Grid item xs={12} sx={{ mt: !editForm ? 2 : 0 }}>
                <TextField
                  size="small"
                  type="text"
                  name="mobile"
                  label="Find Participant"
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
            ) : null}

            {(editForm
              ? searchResult?.length > 0 &&
                participants?.length < maxAllowedParticipants &&
                mobile
              : fetchedNames?.length > 0) && (
              <Grid item xs={12}>
                <Box
                  className="hideScrollbar"
                  style={{
                    maxHeight: editForm ? "200px" : "none",
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
                      {!editForm ? (
                        <th
                          style={{
                            border: "1px solid gray",
                            padding: "4px 0",
                            fontWeight: 100,
                          }}
                        >
                          Mobile
                        </th>
                      ) : null}
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
                        {editForm ? "Add" : "Booking Mode"}
                      </th>
                    </tr>
                    {Array.isArray(editForm ? searchResult : fetchedNames) &&
                      (editForm
                        ? maxAllowedParticipants > fetchedParticipants?.length
                        : true) &&
                      (editForm ? searchResult : fetchedNames).map(
                        (obj: any, i: number) => {
                          return (
                            <tr
                              key={obj?._id ? obj?._id : obj + i}
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
                                {obj?._id
                                  ? `${obj.name?.first} ${obj.name?.last}`
                                  : obj}
                              </td>
                              {!editForm ? (
                                <td
                                  style={{
                                    border: "1px solid gray",
                                    padding: "5px 15px",
                                    fontSize: "0.91em",
                                  }}
                                >
                                  {obj?._id ? obj?.mobile : "-"}
                                </td>
                              ) : null}
                              <td
                                style={{
                                  border: "1px solid gray",
                                  padding: "5px 15px",
                                  fontSize: "0.91em",
                                }}
                              >
                                {obj?._id ? obj?.email : "-"}
                              </td>
                              <td
                                style={{
                                  border: "1px solid gray",
                                  padding: "5px 15px",
                                  textTransform: !editForm
                                    ? "capitalize"
                                    : "none",
                                }}
                              >
                                {editForm ? (
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
                                ) : (
                                  fetchedParticipants[i]?.split("/")[1]
                                )}
                              </td>
                            </tr>
                          );
                        }
                      )}
                  </table>
                </Box>
              </Grid>
            )}
          </Grid>

          {editForm ? (
            <Box>
              <form
                onSubmit={(e) => {
                  e?.preventDefault();
                  setEditForm(false);

                  TourService.updateTour(values?.id, {
                    participants: fetchedParticipants,
                  })
                    .then((res) => {
                      successToast("Participants added successfully", 3000);
                    })
                    .catch((err) => {
                      console.error(err);
                      errorToast("Couldn't added participants", 5000);
                    });
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
                            <Grid
                              item
                              xs={9}
                              sx={{ width: { xs: "80%" }, p: 2 }}
                            >
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
                                    "online" ||
                                  fetchedParticipants[index]?.split("/")[2] ==
                                    "added"
                                }
                                value={
                                  typeof fetchedNames[index] === "object"
                                    ? `${fetchedNames[index]?.name?.first} ${fetchedNames[index]?.name?.last}`
                                    : participant?.id?.split("/")[0]
                                }
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
                                      fetchedParticipants[index]?.split(
                                        "/"
                                      )[1] == "online" ||
                                      participants?.length == 1
                                    }
                                    onClick={() => handleDelete(index)}
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
          ) : null}
        </DialogContent>
      </BootstrapDialog>
    </Box>
  );
};

export default ParticipantsDialogue;
