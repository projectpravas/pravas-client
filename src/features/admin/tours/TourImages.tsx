import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";
import useDnD from "../../../shared/draganddrop/useDnD";
const StyledBox = styled(Box)({
  height: 100,
  backgroundColor: "#2222",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: 1,
  cursor: "pointer",
});

const DeleteButton = styled(ClearIcon)({
  fontSize: "1.2em",
  borderRadius: "50%",
  backgroundColor: "red",
  ":&hover": {
    backgroundColor: "red",
  },
});

interface IImagesProps {
  [key: string]: any;
  setImages: Function;
  imgs: File[];
}

interface IImageState {
  [key: string]: any;
}

const AddMoreImages = ({
  handleChange,
  name,
}: {
  handleChange: any;
  name: string;
}) => {
  return (
    <>
      <label htmlFor={name}>
        <StyledBox>
          <AddAPhotoIcon fontSize="large" />
        </StyledBox>
      </label>
      <input
        style={{ display: "none" }}
        type="file"
        multiple
        name={name}
        id={name}
        accept=".png,.jpeg,.jpg,.webp,.svg..jfif"
        onChange={handleChange}
      />
    </>
  );
};

const Images: React.FunctionComponent<IImagesProps> = ({ setImages, imgs }) => {
  const [imagesState, setImagesState] = useState<string[]>([]);
  const { dragEnter, dragStart, drop } = useDnD();

  const setImagesInPackage = (imgArr: File[]) => {
    setImages(imgArr);
  };

  const handleImageDelete = (i: number) => {
    let fileArray: File[] = imgs;

    fileArray.splice(i, 1);

    setImagesInPackage(fileArray.slice(0, 10));
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files, name } = e?.target;

    let fileArray: File[] = [];
    fileArray.push(...imgs);

    if (files)
      for (const file of files) {
        fileArray.push(file);
      }

    setImagesInPackage(fileArray.slice(0, 10));
  };

  const convertImagesToBase64 = (fileArr: File[]) => {
    const arr: any[] = Array(Array.isArray(imgs) ? imgs.length : 0);

    fileArr.forEach((file, i) => {
      (() => {
        const reader = new FileReader();

        reader.onload = function () {
          if (Array.isArray(arr)) arr.splice(i, 1, reader.result);
          setImagesState([...arr]);
        };

        reader.readAsDataURL(file);
      })();
    });
  };

  useEffect(() => {
    if (imgs?.length == 0) setImagesState([]);
    convertImagesToBase64(imgs);
  }, [imgs]);

  return (
    <>
      <Paper sx={{ overflow: "auto", m: 1 }}>
        <Grid container spacing={1} sx={{ p: 1 }}>
          <Grid item xs={12}>
            <h4 style={{ margin: 0 }}>Images</h4>
          </Grid>

          {Array.isArray(imagesState) &&
            imagesState.map((img, i) => {
              return (
                <Grid
                  key={img + "-" + i}
                  item
                  xs={12}
                  sm={2}
                  sx={{ position: "relative", p: 1 }}
                  draggable
                  onDragStart={(e) => dragStart(e, i)}
                  onDragEnter={(e) => dragEnter(e, i)}
                  onDragEnd={(e) => drop(e, imagesState, setImagesState)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                    onClick={() => handleImageDelete(i)}
                  >
                    <DeleteButton />
                  </IconButton>
                  <img
                    src={img}
                    style={{
                      width: "100%",
                      height: "100%",
                      padding: "2px",
                    }}
                  />
                </Grid>
              );
            })}

          {imgs?.length < 10 && (
            <Grid item xs={12} sm={2}>
              <AddMoreImages handleChange={handleImagesChange} name="images" />
            </Grid>
          )}
        </Grid>
      </Paper>
    </>
  );
};

export default Images;
