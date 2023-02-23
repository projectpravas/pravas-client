import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import data from "../../features/frontend/pravas/data";

import { Container, Grid } from "@mui/material";

interface IImageGallaryProps {
  id?: number;
  image?: string[];
  heading?: any;
}

const reqdata: any = [];
data.map((v: any, i: number) => reqdata.push(...v.image));

const TourGallery: React.FunctionComponent<IImageGallaryProps> = ({
  id,
  image,
  heading,
}) => {
  const [images, setImages] = React.useState<Array<any>>([]);
  const [collectionHead, setCollectionHead] = React.useState<any>([]);

  React.useEffect(() => {
    setImages(reqdata);
    setCollectionHead([...new Set(data.map((item) => item.heading))]);
  }, []);

  const gallary_filter = (itemHead: any) => {
    const filterData: any = data.filter((item: any) => {
      if (item.heading === itemHead) setImages([...item.image]);
    });
  };

  return (
    <Grid>
      <Grid
        item
        marginLeft={{ xs: "20px", sm: "75px", md: "70px", lg: "120px" }}
      >
        {collectionHead.map((itemHead: string, i: number) => (
          <Button
            style={{ margin: "5px" }}
            variant="contained"
            onClick={() => gallary_filter(itemHead)}
          >
            {itemHead}
          </Button>
        ))}
      </Grid>

      <ImageList cols={5} gap={0}>
        {Array.isArray(images) &&
          images.map((item, i) => (
            <ImageListItem key={item.image + i}>
              <img
                src={`${item}?w=248&fit=crop&auto=format`}
                srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 5x`}
                alt={item.heading}
                loading="lazy"
              />
            </ImageListItem>
          ))}
      </ImageList>
    </Grid>
  );
};

export default TourGallery;
