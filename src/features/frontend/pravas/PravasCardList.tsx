import { Grid } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectAllTours } from "../../../app/slices/TourSlice";
import TourService from "../../../services/TourService";
import TourModel from "../../../shared/models/tourModel";
import PravasPackageCard from "./PravasPackageCard";
import { useSearchParams } from "react-router-dom";

interface IPravasCardListProps {}

const PravasCardList: React.FunctionComponent<IPravasCardListProps> = ({}) => {
  const [data, setData] = React.useState<Array<TourModel>>();
  const [loadState, setLoadState] = React.useState(false);
  const [searchParams] = useSearchParams();

  let paramValue = searchParams.toString();

  const loadPackages = (paramValue = "") => {
    TourService.fetchAllTours(`?category=package&${paramValue}`)
      .then((response) => {
        setData(response?.data?.data);
        // dispatch(addAllTours(response?.data?.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  paramValue = paramValue?.replaceAll("=all", "=");

  React.useEffect(() => {
    loadPackages(paramValue);
  }, [searchParams]);

  return (
    <>
      {Array.isArray(data) &&
        data
          .filter(
            (v, i) => v?.category === "package" && v?.packageStatus === "active"
          )
          .map((v, i) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                marginTop: "15px",
                marginBottom: "15px",
              }}
              key={v?._id}
            >
              <div>
                {v._id && (
                  <PravasPackageCard data={v} loadData={loadPackages} />
                )}
              </div>
            </Grid>
          ))}
    </>
  );
};

export default PravasCardList;
