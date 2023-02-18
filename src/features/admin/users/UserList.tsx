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
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";

interface IUserListProps {
  title: string;
  data: object[];
  loadUsers: Function;
}

const UserList: React.FunctionComponent<IUserListProps> = ({
  title,
  data,
  loadUsers,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const role = pathname.includes("users") ? "admin" : "customer";

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
        UserService.deleteUser(id)
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
  const handleAdd = (role: string) => {
    navigate(`/secured/add-edit/0/add/${role}`);
  };

  // handle edit
  const handleEdit = (id: string, role: string) => {
    navigate(`/secured/add-edit/${id}/edit/${role}`);
  };

  const handleStausAndVerification = (op: string, value: any, user: any) => {
    let newValue =
      value == "active"
        ? "inactive"
        : value == "inactive"
        ? "active"
        : value == true
        ? false
        : true;
    console.log(value, newValue);

    //create form data
    const fd = new FormData();

    op == "status" && fd.append("status", newValue as string);
    // op == "verified" && fd.append("verified", newValue as string);

    UserService.updateUser(user?._id, fd)
      .then((res) => {
        loadUsers();
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
      name: "userId",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      label: "Name",
      name: "name.first",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Surname",
      name: "name.last",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Mobile",
      name: "mobile",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Email",
      name: "email",
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

        customBodyRender: (value: string, metaData: any) => {
          const user = data[metaData.rowIndex];
          return (
            <>
              {
                <Chip
                  style={{ color: value == "active" ? "green" : "red" }}
                  label={value == "active" ? "active" : "inactive"}
                  onClick={() =>
                    handleStausAndVerification("status", value, user)
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
          const user = data[metaData.rowIndex];
          return (
            <>
              {
                <Chip
                  color={value == true ? "primary" : "warning"}
                  label={value == true ? "Verified" : "unverified"}
                  // onClick={() =>
                  //   handleStausAndVerification("verified", value, user)
                  // }
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
          const user: User = data[index];
          return (
            <Box sx={{ display: "flex" }}>
              <IconButton
                onClick={() =>
                  handleEdit(user?._id as string, user?.role || "")
                }
              >
                <EditIcon style={{ color: "#444" }} />
              </IconButton>
              <IconButton onClick={() => handleDelete(user?._id as string)}>
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
          <IconButton onClick={() => handleAdd(role)}>
            <PersonAddIcon color="primary" fontSize="large" />
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

export default UserList;
