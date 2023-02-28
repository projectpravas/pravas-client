import { Typography, IconButton, Grid } from "@mui/material";
import MUIDataTable from "mui-datatables";
import * as React from "react";
import TourService from "../../../services/TourService";
import UserService from "../../../services/UserService";
import TourModel from "../../../shared/models/tourModel";
import CustomTitle from "../../../ui/title/CustomTitle";
import { errorToast, successToast } from "../../../ui/toast/Toast";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

interface IReviewListProps {}

const ReviewList: React.FunctionComponent<IReviewListProps> = (props) => {
  const [tours, setTours] = React.useState<object[]>([{}]);

  const loadTours = () => {
    TourService.fetchAllTours(`?category=package`)
      .then((res) => {
        setTours(res?.data?.data);
      })
      .catch((err) => {
        console.error(err);
        const msg = err?.response?.data?.message || "Try Again..";
        errorToast(msg, 5000);
      });
  };

  React.useEffect(() => {
    loadTours();
  }, []);

  console.log("Wishlist-Tours", tours);

  const handleReviewStatus = (value: any, tourId: any, pravasiId: any) => {
    let newValue = value == "true" ? "false" : "true";

    const obj = { approved: newValue as string, pravasiId: pravasiId };

    TourService.updateReview(tourId, obj)
      .then((res) => {
        loadTours();
        successToast(` Status Changed..`, 2000);
      })
      .catch((err) => {
        console.error(err);
        errorToast(`couldn't Changed..`, 3000);
      });
  };

  const title = "Wishlist";
  const columns = [
    {
      label: "Sr. No.",
      name: "tourId",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (index: any) => {
          return <Typography>{index + 1}</Typography>;
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
      label: "Reviews",
      name: "",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (index: number) => {
          const tour: TourModel = tours[index];
          const arr: Array<any> = [];
          const feedbacks: any = tour?.feedbacks?.map((v, i) => {
            arr.push(v);
          });

          return (
            <div>
              <ol>
                {Array.isArray(arr) &&
                  arr.map((v, i) => (
                    <li key={v?.name + i}>
                      <Grid container>
                        <Grid item>
                          <Typography>Name : {v?.name}</Typography>
                          <Typography>Rating : {v?.rating}</Typography>
                          <Typography>Comment : {v?.comment}</Typography>
                          <Typography>Approved : {v?.approved}</Typography>
                          <Typography>
                            Wishlist : {v?.liked ? "Yes" : "No"}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <IconButton
                            onClick={() =>
                              handleReviewStatus(
                                v?.approved,
                                tour._id,
                                v?.pravasiId
                              )
                            }
                          >
                            <TaskAltIcon
                              fontSize="large"
                              sx={{
                                color: v?.approved == "true" ? "green" : "red",
                              }}
                            />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </li>
                  ))}
              </ol>
            </div>
          );
        },
      },
    },
  ];

  return (
    <>
      <CustomTitle title="Review List" />
      <MUIDataTable title={title} columns={columns} data={tours} />
    </>
  );
};

export default ReviewList;
