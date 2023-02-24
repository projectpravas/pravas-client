import { Button } from "@mui/material";
import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { RWebShare } from "react-web-share";
import { useLocation } from "react-router-dom";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
interface ISharePravasCardProps {}

const SharePravasCard: React.FunctionComponent<ISharePravasCardProps> = (
  props
) => {
  const { pathname, search } = useLocation();
  return (
    <>
      <RWebShare
        data={{
          url: search,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <Button
          sx={{
            bgcolor: "#f0f3f6",
            color: "#838590",
            fontWeight: "700",
            fontFamily: "poppins",
            "&:hover": {
              bgcolor: "#27488d",
              color: "white",
            },
          }}
        >
          <NearMeOutlinedIcon />
          Share
        </Button>
      </RWebShare>
    </>
  );
};

export default SharePravasCard;
