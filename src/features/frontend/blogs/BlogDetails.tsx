import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";
import * as React from "react";

interface IBlogDetailsProps {
  data: any[];
}

const BlogDetails: React.FunctionComponent<IBlogDetailsProps> = ({ data }) => {
  return (
    <>
      <Container>
        {Array.isArray(data) &&
          data.map((blogDetail, i) => {
            return (
              <Grid container>
                {/* image Area  */}
                <Grid item xs={12}>
                  <img
                    src={blogDetail?.largeImage}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Grid>
                {/* Pravas & category */}
                <Grid item xs={12}></Grid>
                {/* Blog Details */}
                <Grid item xs={12}>
                  {Array.isArray(blogDetail?.blog) &&
                    blogDetail?.blog.map((details: any, i: any) => {
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
            );
          })}
      </Container>
    </>
  );
};

export default BlogDetails;
