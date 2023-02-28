import * as React from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { endPoints } from "../../../api";
import BlogService from "../../../services/BlogService";

interface IMustWatchBlogDetailsProps {}

const MustWatchBlogDetails: React.FunctionComponent<
  IMustWatchBlogDetailsProps
> = (props) => {
  const [data, setData] = React.useState<any[]>();
  const [mustWatch, setMustWatch] = React.useState<any[]>();

  const loadBlogs = () => {
    BlogService.fetchAllBlogs()
      .then((response) => {
        setData(response?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const randomArr = () => {
    const arr = data;
    const index = Math.floor(Math.random() * (arr ? arr?.length : 2));
    arr?.splice(0, index);

    setMustWatch(arr);
  };

  React.useEffect(() => {
    loadBlogs();
    randomArr();
  }, []);

  return (
    <>
      <Grid container spacing={1} sx={{ pt: 1 }}>
        {Array.isArray(data) &&
          data.slice(0, 3).map((blog, i) => (
            <Grid item key={blog?.title + i} sx={{ py: 2 }}>
              <Grid container spacing={2}>
                {/* image */}
                <Grid item xs={5}>
                  <img
                    style={{ width: "100%", borderRadius: 8 }}
                    src={
                      `${endPoints?.serverBaseURL}/${blog?.image}`
                        ? `${endPoints?.serverBaseURL}/${blog?.image}`
                        : "./placeholder-blogs.png"
                    }
                  />
                </Grid>
                {/* title */}
                <Grid item xs={7}>
                  <Typography
                    sx={{
                      color: "#2C5799",
                      fontSize: "16px",
                      fontWeight: "800",
                    }}
                  >
                    {blog?.title}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ pt: 1 }} />
            </Grid>
          ))}
        <img src="./adPlaceholder.jpg" style={{ width: "100%" }} />
      </Grid>
    </>
  );
};

export default MustWatchBlogDetails;
