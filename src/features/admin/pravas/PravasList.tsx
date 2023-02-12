import React from "react";
import MUIDataTables from "mui-datatables";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import UserService from "../../../services/UserService";
import User from "../../../shared/models/userModel";
import { useLocation, useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";
import { errorToast, successToast } from "../../../ui/toast/Toast";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import TourModel from "../../../shared/models/tourModel";
import TourService from "../../../services/TourService";

interface IPravasListProps {
  title: string;
  data: object[];
  loadTours: Function;
}

const PravasList: React.FunctionComponent<IPravasListProps> = ({
  title,
  data,
  loadTours,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("pravas") ? "package" : "tour";

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
    navigate(`/secured/add-edit/0/add/${category}`);
  };

  // handle edit
  const handleEdit = (id: string, category: string) => {
    navigate(`/secured/add-edit/${id}/edit/${category}`);
  };

  const handleStausAndVerification = (op: string, value: any, tour: any) => {
    let newValue =
      value == "active"
        ? "inactive"
        : value == "inactive"
        ? "active"
        : value == true
        ? false
        : true;

    //create form data
    const fd = new FormData();

    op == "status" && fd.append("status", newValue as string);
    // op == "verified" && fd.append("verified", newValue as string);

    TourService.updateTour(tour?._id, fd)
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
      label: "ID",
      name: "tourId",
      options: {
        filter: false,
        sort: true,
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
      label: "Max Persons",
      name: "maxPersons",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Duration",
      name: "duration",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (dataIndex: any, rowIndex: any) => {
          const tour: any = data[rowIndex];
          console.log(tour);
          return (
            <>
              {tour?.duration?.days} days {tour?.duration?.nights} nights
            </>
          );
        },
      },
    },
    {
      label: "Status",
      name: "status",
      options: {
        filter: true,
        sort: true,

        customBodyRender: (value: string, metaData: any) => {
          const tour = data[metaData.rowIndex];
          return (
            <>
              {
                <Chip
                  style={{ color: value == "active" ? "green" : "red" }}
                  label={value == "active" ? "active" : "inactive"}
                  onClick={() =>
                    handleStausAndVerification("status", value, tour)
                  }
                />
              }
            </>
          );
        },
      },
    },
    {
      label: "Verified",
      name: "verified",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: boolean, metaData: any) => {
          const tour = data[metaData.rowIndex];
          return (
            <>
              {
                <Chip
                  color={value == true ? "primary" : "warning"}
                  label={value == true ? "Verified" : "unverified"}
                  onClick={() =>
                    handleStausAndVerification("verified", value, tour)
                  }
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
        customBodyRenderLite: (index: number) => {
          const tour: TourModel = data[index];
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
    filterType: "checkbox",
    responsive: "standard",
    enableNestedDataAccess: ".",
    customToolbar: () => {
      return (
        <Tooltip title={`Add ${title.split(" ")[0]}`} placement="top">
          <IconButton onClick={() => handleAdd(category)}>
            <AddLocationAltIcon color="primary" fontSize="large" />
          </IconButton>
        </Tooltip>
      );
    },
  };
  return (
    <Container sx={{ mt: 2 }} disableGutters>
      {/* <Button type="button" variant="contained" sx={{ mb: 1, ml: 2 }}>
        {`Add ${title.split(" ")[0]}`}
      </Button> */}
      <MUIDataTables
        title={title}
        columns={columns}
        data={data}
        options={options}
      />
    </Container>
  );
};

export default PravasList;