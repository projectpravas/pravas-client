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
import TourService from "../../../../services/TourService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tour from "@mui/icons-material/Tour";
interface IMyWishlistProps {}

const MyWishlist: React.FunctionComponent<IMyWishlistProps> = () => {
  const [tours, setTours] = useState<Array<TourModel>>([]);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const loggedUser: UserModel = useSelector(selectLoggedUser);

  const loadUser = () => {
    loggedUser._id &&
      UserService.fetchOneUser(loggedUser._id)
        .then((res) => {
          console.log(res?.data?.data);

          setTours(res?.data?.data?.wishlist);
        })
        .catch((err) => {
          console.error(err);
          const msg = err?.response?.data?.message || "Try Again..";
          errorToast(msg, 5000);
        });
  };

  // handle view
  const handleView = (id: string) => {
    navigate(`/pravas/explore/${id}`);
  };
  console.log();

  const columns = [
    {
      label: "ID",
      name: "",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (index: any) => {
          return <>{<p>{index + 1}</p>}</>;
        },
      },
    },
    {
      label: "Title",
      name: "title",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (index: any) => {
          const tour = tours[index];
          return <>{<p>{tour?.title}</p>}</>;
        },
      },
    },
    {
      label: "Book Now",
      name: "",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (index: any) => {
          return (
            <>
              <IconButton>
                <Chip label="Book Now" color="primary" />
              </IconButton>
            </>
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
    loadUser();
  }, []);
  //   console.log(tours);

  return (
    <Container sx={{ mt: 2 }} disableGutters>
      <MUIDataTables
        title={<h3>My Wishlist</h3>}
        columns={columns as any}
        data={tours}
        options={options}
      />
    </Container>
  );
};

export default MyWishlist;
