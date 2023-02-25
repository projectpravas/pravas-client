import React, { useState } from "react";
import MUIDataTables from "mui-datatables";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import UserService from "../../../services/UserService";
import User from "../../../shared/models/userModel";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Chip, Grid, MenuItem, Select } from "@mui/material";
import { errorToast, successToast } from "../../../ui/toast/Toast";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import TourModel from "../../../shared/models/tourModel";
import TourService from "../../../services/TourService";
import ParticipantsDialogue from "./ParticipantsDialogue";
import CustomTitle from "../../../ui/title/CustomTitle";

interface IPravasListProps {
  title: string;
  data: TourModel[];
  loadTours: Function;
}

const PravasList: React.FunctionComponent<IPravasListProps> = ({
  data,
  loadTours,
  title,
}) => {
  const [showDialogue, setShowDialogue] = useState({
    flag: false,
    id: "0",
  });
  const [dialogTourStatus, setDialogTourStatus] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname?.split("/").includes("tours") ? "tour" : "package";

  //handle delete
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result?.isConfirmed) {
        TourService.deleteTour(id)
          .then((res) => {
            Swal.fire("Deleted!", "Deleted successfully...", "success");
            loadTours();
            navigate(``);
          })
          .catch((err) => {
            console.error(err);
            const msg = err?.response?.data?.message || "Coudn't delete...";

            Swal.fire(
              "Coudn't Deleted!",
              "Couldn't Deleted successfully...",
              "error"
            );
          });
      }
    });
  };

  // handle add
  const handleAdd = (category: string) => {
    navigate(`${pathname}/add-edit/0/add/admin`);
  };
  // handle edit
  const handleEdit = (id: string, category: string) => {
    navigate(`${pathname}/add-edit/${id}/edit/admin`);
  };

  const handleStatus = (op: string, value: any, tour: any) => {
    let newValue = value == "active" ? "inactive" : "active";

    const obj = { packageStatus: newValue as string };

    TourService.updateTour(tour?._id, obj)
      .then((res) => {
        loadTours();
        successToast(
          `${op == "status" ? "Status" : "Verification"} Changed..`,
          2000
        );
      })
      .catch((err) => {
        console.error(err);
        errorToast(
          `${op == "status" ? "Status" : "Verification"} couldn't Changed..`,
          3000
        );
      });
  };

  const columns = [
    {
      label: "Sr No",
      name: "_id",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (index: any) => index + 1,
      },
    },
    {
      label: "Title",
      name: "title",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Price",
      name: "price",
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
        customBodyRenderLite: (dataIndex: any, rowIndex: any) => {
          const tour: any = data[dataIndex];
          return (
            <>
              {new Intl.DateTimeFormat("en-IN").format(
                tour?.tourDate ? new Date(`${tour?.tourDate}`) : new Date()
              )}
            </>
          );
        },
      },
    },
    {
      label: category == "package" ? "Max Persons" : "Available Seat",
      name: "maxPersons",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (dataIndex: any, rowIndex: any) => {
          const tour: any = data[dataIndex];
          return (
            <>
              {category == "package" ? (
                <Chip
                  sx={{
                    p: 1,
                    backgroundColor: "#c9e9ff",
                    color: "#005e9d",
                    fontWeight: 600,
                  }}
                  label={`${tour?.maxPersons}`}
                />
              ) : tour?.maxPersons == tour?.participants?.length ? (
                <Chip
                  sx={{ backgroundColor: "#9af499", p: 1 }}
                  label={`${tour?.participants?.length} full`}
                />
              ) : (
                <Chip
                  sx={{ backgroundColor: "#f4f458", p: 1 }}
                  label={`${tour?.participants?.length}/${tour?.maxPersons}`}
                />
              )}
            </>
          );
        },
      },
    },
    {
      label: "Duration",
      name: "duration",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex: any, rowIndex: any) => {
          const tour: any = data[dataIndex];
          return (
            <>
              {tour?.duration?.days}D{tour?.duration?.nights}N
            </>
          );
        },
      },
    },

    {
      label: "Status",
      name: category == "package" ? "packageStatus" : "tourDate",
      options: {
        filter: true,
        sort: true,
        filterType: "dropdown",
        filterOptions:
          category == "tour"
            ? {
                names: ["completed", "upcoming", "ongoing"],

                logic: (value: any, filters: any, metaData: any) => {
                  const tour: any = data.find((t) => t?._id == metaData[0]);
                  const days = tour?.duration?.days ? tour?.duration?.days : 0;

                  const startDate = new Intl.DateTimeFormat("en-US").format(
                    new Date(tour?.tourDate)
                  );
                  const lastDate = new Intl.DateTimeFormat("en-US").format(
                    new Date(
                      new Date(tour?.tourDate).setDate(
                        new Date(tour?.tourDate).getDate() + Number(days)
                      )
                    )
                  );

                  const today = new Intl.DateTimeFormat("en-US").format(
                    new Date(Date.now())
                  );

                  if (filters.includes("completed")) {
                    if (lastDate > today) {
                      return data;
                    }
                  }

                  if (filters.includes("ongoing")) {
                    if (!(startDate <= today && today <= lastDate)) {
                      return data;
                    }
                  }

                  if (filters.includes("upcoming")) {
                    if (startDate <= today) {
                      return data;
                    }
                  }
                },
              }
            : {
                names: ["active", "inactive"],
                logic: (value: any, filters: any, data: any) => {
                  if (filters.includes("active")) {
                    if (value == "inactive") {
                      return data;
                    }
                  }
                  if (filters.includes("inactive")) {
                    if (value == "active") {
                      return data;
                    }
                  }
                },
              },

        customBodyRender: (value: any, metaData: any) => {
          const tour: TourModel = data.find(
            (tour: TourModel) => tour?._id == metaData.rowData[0]
          ) as TourModel;
          const lastDate = new Date(
            new Date(`${tour?.tourDate}`).setDate(
              new Date(`${tour?.tourDate}`).getDate() +
                Number(`${tour?.duration?.days}`)
            )
          );
          const statusVal =
            tour?.category == "tour" &&
            new Date(`${tour?.tourDate}`) > new Date()
              ? "upcoming"
              : lastDate < new Date()
              ? "completed"
              : "ongoing";
          console.log("status", metaData);

          return (
            <>
              {
                <Chip
                  style={{
                    textTransform: "capitalize",
                    fontSize: category == "tour" ? "1em" : "inherit",
                    color:
                      tour?.category == "package"
                        ? "#fff"
                        : statusVal == "upcoming"
                        ? "#005e9d"
                        : statusVal == "completed"
                        ? "#b32800"
                        : "#00a300",
                    backgroundColor:
                      tour?.category == "package"
                        ? value == "active"
                          ? "#00a300"
                          : "#b32800"
                        : "#fff",
                  }}
                  label={
                    tour?.category == "package"
                      ? value == "active"
                        ? "active"
                        : "inactive"
                      : statusVal
                  }
                  onClick={() =>
                    tour?.category == "package" &&
                    handleStatus("status", value, tour)
                  }
                />
              }
            </>
          );
        },
      },
    },
    {
      label: "Add Tour",
      name: "addTour",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: boolean, metaData: any) => {
          const tour: TourModel = data[metaData.rowIndex];
          return (
            <>
              {
                <Chip
                  sx={{
                    backgroundColor: "#005e9d",
                    transition: "0.4s ease-in-out",
                    color: "#fff",
                    textTransform: "capitalize",
                    "&:hover": {
                      color: "#005e9d",
                      backgroundColor: "#fff",
                      border: "1px solid #005e9d",
                    },
                  }}
                  label="Add Tour"
                  variant="outlined"
                  onClick={() => {
                    const path = pathname
                      .split("/")
                      .reduce(
                        (text, value, i, array) =>
                          text + (i < array.length - 1 ? `/${value}` : `/tours`)
                      );

                    navigate(`${path}/add-edit/${tour?._id}/add/admin`);
                  }}
                />
              }
            </>
          );
        },
      },
    },
    {
      label: "Participants",
      name: "participants",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex: any, rowIndex: any) => {
          const tour: TourModel = data[dataIndex];
          const lastDate = new Date(
            new Date(`${tour?.tourDate}`).setDate(
              new Date(`${tour?.tourDate}`).getDate() +
                Number(`${tour?.duration?.days}`)
            )
          );
          const statusVal =
            tour?.category == "tour" &&
            new Date(`${tour?.tourDate}`) > new Date()
              ? "upcoming"
              : lastDate < new Date()
              ? "completed"
              : "ongoing";

          return (
            <Box sx={{ display: "flex" }}>
              <Chip
                sx={{
                  backgroundColor: "#005e9d",
                  color: "#fff",
                  transition: "0.4s ease-in-out",
                  textTransform: "capitalize",
                  "&:hover": {
                    color: "#005e9d",
                    backgroundColor: "#fff",
                    border: "1px solid #005e9d",
                  },
                }}
                label="participants"
                variant="outlined"
                onClick={() => {
                  setShowDialogue({ flag: true, id: tour?._id as string });
                  setDialogTourStatus(statusVal);
                }}
              />
            </Box>
          );
        },
      },
    },
    {
      label: "Actions",
      name: "actions",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex: any, rowIndex: any) => {
          const tour: TourModel = data[dataIndex];
          return (
            <Box sx={{ display: "flex" }}>
              <IconButton
                onClick={() =>
                  handleEdit(tour?._id as string, tour?.category || "")
                }
              >
                <EditIcon style={{ color: "#444" }} />
              </IconButton>
              <IconButton onClick={() => handleDelete(tour?._id as string)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          );
        },
      },
    },
  ];

  const options: object = {
    filterType: "dropdown",
    responsive: "standard",
    enableNestedDataAccess: ".",

    customToolbar: () => {
      return (
        <>
          <Tooltip title={`Add ${title.split(" ")[0]}`} placement="top">
            <IconButton onClick={() => handleAdd(category)}>
              <AddLocationAltIcon sx={{ color: "#ff9800" }} fontSize="large" />
            </IconButton>
          </Tooltip>
        </>
      );
    },
  };

  return (
    <>
      <Container sx={{ mt: 2 }} disableGutters>
        {showDialogue?.flag && (
          <ParticipantsDialogue
            values={showDialogue}
            handleDialogue={setShowDialogue}
            status={dialogTourStatus}
          />
        )}
        {/* <CustomTitle title={title} /> */}
        <MUIDataTables
          title={<h3>{title}</h3>}
          // title={title}
          columns={
            category == "tour"
              ? (columns?.filter(
                  (obj) => !["addTour", "price"].includes(obj?.name)
                ) as any)
              : (columns?.filter(
                  (obj) => !["participants", "tourDate"].includes(obj?.name)
                ) as any)
          }
          data={data}
          options={options}
        />
      </Container>

      <Outlet />
    </>
  );
};

export default PravasList;
