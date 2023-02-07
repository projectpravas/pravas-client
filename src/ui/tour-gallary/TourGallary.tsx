import * as React from "react";
import useEffect from "react";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import data from "../../features/frontend/pravas/data";

interface IImageGallaryProps {
  id?: number;
  image?: string[];
  heading?: any;
}

const reqdata: any = [];
data.map((v, i) => reqdata.push(...v.image));
// const arrHead = data.map((head, i) => head?.heading);

// console.log("heading:", arrHead);
// console.log("data", reqdata);
const TourGallery: React.FunctionComponent<IImageGallaryProps> = ({
  id,
  image,
  heading,
}) => {
  const [imgAll, setImgAll] = React.useState([]);
  const [collectionHead, setCollectionHead] = React.useState<any>([]);

  React.useEffect(() => {
    setImgAll(reqdata);
    setCollectionHead([...new Set(data.map((item) => item.heading))]);
  }, []);

  const gallary_filter = (itemData: any) => {
    const filterData: any = data.filter(
      (item: any) => item.heading == itemData
    );
    setImgAll(filterData);
  };
  console.log("img:", imgAll);

  // console.log("heading:", collectionHead);

  return (
    <Grid container>
      <Stack direction="row">
        {collectionHead.map((itemHead: string, i: number) => (
          <Button variant="contained" onClick={() => gallary_filter(itemHead)}>
            {itemHead}
          </Button>
        ))}
      </Stack>

      <ImageList
        variant="woven"
        sx={{ width: "100%", height: "100%" }}
        cols={6}
        rowHeight={300}
      >
        {Array.isArray(imgAll) &&
          imgAll.map((item: any, i: number) => (
            <ImageListItem key={item?.image}>
              <img src={item.image} key={item?.id} />
            </ImageListItem>
          ))}
      </ImageList>
    </Grid>
  );
};
export default TourGallery;
