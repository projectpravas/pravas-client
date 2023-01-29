import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

interface INetworkProps {
  show: any;
}

const Network: React.FunctionComponent<INetworkProps> = ({ show }) => {
  const [shouldComponentShow, setShouldComponentShow] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldComponentShow(true);
    } else {
      setTimeout(() => {
        setShouldComponentShow(false);
      }, 1000);
    }
  }, [show]);

  return (
    <>
      <Grid
        // container
        sx={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          backgroundColor: "#5b5858",
          transition: `1s ease-in-out`,
        }}
        style={{
          opacity: `${show ? 0.8 : 0}`,
          zIndex: `${show ? (shouldComponentShow ? "9999" : "-9999") : "-10"}`,
        }}
        //   style={{ animation: `${show ? "inStyle" : "outStyle"} 1s` }}
        //   onAnimationEnd={animationEnd}
      >
        <Grid
          //   item
          sx={{
            border: "10px solid black",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: `translate(-50%,-50%)`,
            backgroundColor: "#eee",
            padding: "2em",
            borderRadius: "2em",
            // transition: "1s ease-in-out",
            // opacity: `${show ? 0.8 : 0}`,
          }}
        >
          <Box
            component="h1"
            sx={{
              fontSize: "3em",
              color: "red",
              WebkitTextStroke: "2px black",
              fontWeight: "900",
            }}
          >
            Offline
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Network;
