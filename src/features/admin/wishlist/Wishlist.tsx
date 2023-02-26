import MUIDataTable from "mui-datatables";
import * as React from "react";
import TourService from "../../../services/TourService";
import UserService from "../../../services/UserService";
import TourModel from "../../../shared/models/tourModel";
import CustomTitle from "../../../ui/title/CustomTitle";
import { errorToast } from "../../../ui/toast/Toast";

interface IWishlistProps {}

const Wishlist: React.FunctionComponent<IWishlistProps> = (props) => {
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

  const title = "Wishlist";
  const columns = [
    {
      label: "Sr. No.",
      name: "tourId",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (index: any) => {
          return <p>{index + 1}</p>;
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
      label: "Name",
      name: "",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (index: number) => {
          const tour: TourModel = tours[index];
          const arr: Array<string> = [];
          const destinations: any = tour?.feedbacks?.forEach((v, i) => {
            if (v.liked == true) {
              arr.push(v?.name as string);
            }
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
    {
      label: "Mobile",
      name: "",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (index: number) => {
          const tour: TourModel = tours[index];
          const arr: Array<string> = [];
          const destinations: any = tour?.feedbacks?.forEach((v, i) => {
            if (v.liked == true) {
              // const userId = v?.pravasiId as string;
              let userNo;
              UserService.fetchOneUser(v?.pravasiId as string).then((res) => {
                userNo = res?.data?.data?.mobile[0] as string;
              });
              userNo && arr.push(userNo);
            }
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
  ];

  return (
    <>
      <CustomTitle title="Wishlist" />
      <MUIDataTable title={title} columns={columns} data={tours} />
    </>
  );
};

export default Wishlist;
