import React, { useEffect, useState } from "react";
import MUIDataTables from "mui-datatables";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import UserService from "../../../../services/UserService";
import { useLocation, useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";
import { errorToast, successToast } from "../../../../ui/toast/Toast";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import TourModel from "../../../../shared/models/tourModel";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../../../app/slices/AuthSlice";
import UserModel from "../../../../shared/models/userModel";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

interface IMyToursProps {}

const MyTours: React.FunctionComponent<IMyToursProps> = () => {
  const [myTours, setMyTours] = useState<TourModel[]>([]);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const loggedUser: UserModel = useSelector(selectLoggedUser);

  const loadMyTours = () => {
    loggedUser?._id &&
      UserService?.fetchOneUser(loggedUser?._id)
        .then((res) => {
          setMyTours(res?.data?.data?.tours);
        })
        .catch((err) => {
          console.error(err);
        });
  };

  // handle view
  const handleView = (id: string) => {
    navigate(`/pravas/explore/${id}`);
  };

  const columns = [
    {
      label: "ID",
      name: "_id",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (index: number) => {
          return index + 1;
        },
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
      label: "Duration",
      name: "duration.days",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value: string, metaData: any) => {
          return `${value}D${Number(value) - 1}N`;
        },
      },
    },
    {
      label: "From",
      name: "tourDate",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any, metaData: any) => {
          const tour: TourModel = myTours.find(
            (tour: TourModel) => tour?._id == metaData.rowData[0]
          ) as TourModel;
          return (
            tour?.tourDate &&
            new Intl.DateTimeFormat("en-IN").format(
              new Date(tour?.tourDate ? tour?.tourDate : (Date.now() as any))
            )
          );
        },
      },
    },

    {
      label: "To",
      name: "tourDate",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: any, metaData: any) => {
          const tour: TourModel = myTours.find(
            (tour: TourModel) => tour?._id == metaData.rowData[0]
          ) as TourModel;
          return (
            tour?.tourDate &&
            new Intl.DateTimeFormat("en-IN").format(
              new Date(
                new Date(`${tour?.tourDate}`).setDate(
                  new Date(`${tour?.tourDate}`).getDate() +
                    Number(`${tour?.duration?.days}`)
                )
              )
            )
          );
        },
      },
    },

    {
      label: "Location",
      name: "tourLocation",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      label: "Status",
      name: "status",
      options: {
        filter: true,
        sort: true,
        filterType: "dropdown",
        filterOptions: {
          names: ["completed", "Booked", "ongoing"],

          logic: (value: any, filters: any, data: any) => {
            const tour: any = myTours.find((t) => t?._id == data[0]);

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
        },

        customBodyRender: (value: any, metaData: any) => {
          const tour: TourModel = myTours.find(
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
              ? "Booked"
              : lastDate < new Date()
              ? "completed"
              : "ongoing";

          return (
            <>
              {
                <Chip
                  style={{
                    textTransform: "capitalize",
                    fontSize: "1em",
                    color:
                      statusVal == "Booked"
                        ? "#005e9d"
                        : statusVal == "completed"
                        ? "#b32800"
                        : "#00a300",
                    backgroundColor: "#fff",
                  }}
                  label={statusVal}
                />
              }
            </>
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
        customBodyRender: (value: number, data: any) => {
          const tour: any = myTours.find((t) => t?._id == data?.rowData[0]);

          return (
            <Box sx={{ display: "flex" }}>
              <IconButton onClick={() => handleView(tour?.packageId as string)}>
                <VisibilityRoundedIcon style={{ color: "#444" }} />
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
  };

  useEffect(() => {
    loadMyTours();
  }, []);

  return (
    <Container sx={{ mt: 2 }} disableGutters>
      <MUIDataTables
        title={<h3>My Tours</h3>}
        columns={columns as any}
        data={myTours}
        options={options}
      />
    </Container>
  );
};

export default MyTours;
