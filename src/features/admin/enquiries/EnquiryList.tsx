import React, { createRef, useRef, useState } from "react";
import MUIDataTables from "mui-datatables";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";
import { errorToast, successToast } from "../../../ui/toast/Toast";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import EnquiryService from "../../../services/EnquiryService";
import EnquiryModel from "../../../shared/models/enquiryModel";
import EnqDetails from "./EnqDetails";

interface IEnquiriesListProps {
  title: string;
  data: object[];
  loadEnquiries: Function;
}

const EnquiriesList: React.FunctionComponent<IEnquiriesListProps> = ({
  title,
  data,
  loadEnquiries,
}) => {
  const navigate = useNavigate();
  //   const { pathname } = useLocation();
  // const role = pathname.includes("enquiries") ? "admin" : "customer";
  const [openDialog, setOpenDialog] = useState(false);
  const [rowData, setRowData] = useState<EnquiryModel>();
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

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
        EnquiryService.deleteEnquiry(id)
          .then((res) => {
            Swal.fire("Deleted!", "Deleted successfully...", "success");
            loadEnquiries();
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
  //   const handleAdd = (role: string) => {
  //     navigate(`/secured/add-edit/0/add/${role}`);
  //   };

  // handle edit
  //   const handleEdit = (id: string, role: string) => {
  //     navigate(`/secured/add-edit/${id}/edit/${role}`);
  //   };

  const handleStausAndVerification = (op: string, value: any, enquiry: any) => {
    let newValue = value == "open" ? "closed" : "open";

    //create form data
    const fd = new FormData();

    // op == "enquiryStatus" && fd.append("enquiryStatus", newValue);
    // op == "verified" && fd.append("verified", newValue as string);
    // console.log(value, newValue);
    // console.log(typeof fd);

    EnquiryService.updateEnquiry(enquiry?._id, { enq: newValue })
      .then((res) => {
        loadEnquiries();
        successToast(
          `${
            op == "enquiryStatus" ? "enquiryStatus" : "Verification"
          } Changed..`,
          2000
        );
      })
      .catch((err) => {
        console.error(err);
        errorToast(
          `${
            op == "enquiryStatus" ? "enquiryStatus" : "Verification"
          } couldn't Changed..`,
          2000
        );
      });
  };

  const columns = [
    {
      label: "ID",
      name: "enquiryId",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (index: any) => {
          return <p>{index + 1}</p>;
        },
      },
    },

    {
      label: "DESTINATIONS",
      name: "",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (index: number) => {
          const enquiry: EnquiryModel = data[index];
          const arr: Array<string> = [];
          const destinations: any = enquiry?.destinations?.forEach((v, i) => {
            arr.push(v.place);
          });

          return (
            <ol>
              {Array.isArray(arr) &&
                arr.map((v, i) => <li key={v + i}>{v}</li>)}
            </ol>
          );
        },
      },
    },
    // {
    //   label: "Participants",
    //   name: "",
    //   options: {
    //     filter: true,
    //     sort: true,
    //     customBodyRenderLite: (index: number) => {
    //       const enquiry: EnquiryModel = data[index];
    //       const arr: Array<string> = [];
    //       const participants: any = enquiry?.participants?.forEach((v, i) => {
    //         arr.push(`${v.name} age:${v.age}`);
    //       });

    //       return (
    //         <ol style={{ textAlign: "justify" }}>
    //           {Array.isArray(arr) &&
    //             arr.map((v, i) => <li key={v + i}>{v}</li>)}
    //         </ol>
    //       );
    //     },
    //   },
    // },
    {
      label: "NAME",
      name: "contactPersonName",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (index: any) => {
          const enquiry: EnquiryModel = data[index];
          return <p>{enquiry?.contactPersonName}</p>;
        },
      },
    },
    {
      label: "MOBILE",
      name: "contactPersonMobile",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "EMAIL",
      name: "contactPersonEmail",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "STATUS",
      name: "enquiryStatus",
      options: {
        filter: true,
        sort: true,

        customBodyRender: (value: string, metaData: any) => {
          const enquiry = data[metaData.rowIndex];

          return (
            <div>
              {
                <Chip
                  style={{ color: value == "open" ? "green" : "red" }}
                  label={value == "open" ? "open" : "closed"}
                  onClick={() =>
                    handleStausAndVerification("enquiryStatus", value, enquiry)
                  }
                />
              }
            </div>
          );
        },
      },
    },
    {
      label: "VIEW",
      name: "",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (index: number) => {
          const enquiry: EnquiryModel = data[index];
          return (
            <Box>
              <IconButton
                onClick={() => {
                  handleDialogOpen();
                  setRowData(enquiry);
                }}
              >
                <Chip color="primary" label="view" />
              </IconButton>
            </Box>
          );
        },
      },
    },

    {
      label: "ACTION",
      name: "actions",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (index: number) => {
          const enquiry: EnquiryModel = data[index];
          return (
            <Box>
              {/* <IconButton
              // onClick={() =>
              //   handleEdit(user?._id as string, user?.role || "")
              // }
              >
                <EditIcon style={{ color: "#444" }} />
              </IconButton> */}
              <IconButton onClick={() => handleDelete(enquiry?._id as string)}>
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
    elevation: 2,
    // customToolbar: () => {
    //   return (
    //     <Tooltip title={`Add ${title.split(" ")[0]}`} placement="top">
    //       <IconButton onClick={() => handleAdd(role)}>
    //         <PersonAddIcon color="primary" fontSize="large" />
    //       </IconButton>
    //     </Tooltip>
    //   );
    // },
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
      <EnqDetails
        rowData={rowData}
        openDialog={openDialog}
        handleDialogOpen={handleDialogOpen}
        handleDialogClose={handleDialogClose}
      />
    </Container>
  );
};

export default EnquiriesList;
