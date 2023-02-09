import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { data } from "./BlogData";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

interface IBlogDetailsProps {}

const BlogDetails: React.FunctionComponent<IBlogDetailsProps> = () => {
  const { id } = useParams();

  const singleCareerData = data.find((obj) => obj?.id == Number(id));
  return (
    <>
      <Helmet>
        <title>{singleCareerData?.title}</title>
        <meta name="description" content={singleCareerData?.blog[0].desc} />
      </Helmet>
      <Container>
        <Grid container>
          {/* image Area  */}
          <Grid item xs={12}>
            <img
              src={singleCareerData?.largeImage}
              style={{ width: "100%", height: "100%" }}
            />
          </Grid>
          {/* Pravas & category */}
          <Grid item xs={12}></Grid>
          {/* Blog Details */}
          <Grid item xs={12}>
            {Array.isArray(singleCareerData?.blog) &&
              singleCareerData?.blog.map((details: any, i: any) => {
                return (
                  <Box sx={{ py: 1 }}>
                    <Typography
                      variant="h5"
                      key={details?.heading + i}
                      sx={{
                        fontSize: 30,
                        fontWeight: 700,
                        color: "#313041",
                        mb: 2,
                      }}
                    >
                      {details?.heading}
                    </Typography>
                    <Typography
                      key={details?.desc + i}
                      sx={{
                        color: "#757783",
                        lineHeight: 1.5,
                        letterSpacing: "0.00938em",
                      }}
                    >
                      {details?.desc}
                    </Typography>
                  </Box>
                );
              })}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BlogDetails;
