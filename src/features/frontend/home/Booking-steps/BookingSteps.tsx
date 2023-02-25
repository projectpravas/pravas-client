import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";
import { Avatar } from "@mui/material";

const data = [
  {
    id: 1,
    title: "Choose Destination",
    desc: "lorem ipsum asd asd sd dw  asd  asd  cj jwkc kjo ck kj askjnasicnauicascnAJH  Yacu jyGWYUSDGIAIUCsduy AHIUSDHI  OIUHXJH HSIUD8ANCNKNOIJH IjOIJXIASHChjznch ",
    image: "https://fikrimuhal.com/images/our-work-imgs/our-work9.png",
    icon: <RoomOutlinedIcon />,
  },
  {
    id: 2,
    title: "Make Payment",
    desc: "lorem ipsum asd asd sd dw  asd  asd  cj jwkc kjo ck kj askjnasicnauicascnAJH  Yacu jyGWYUSDGIAIUCsduy AHIUSDHI  OIUHXJH HSIUD8ANCNKNOIJH IjOIJXIASHChjznch ",
    image: "https://cdn-icons-png.flaticon.com/512/1087/1087097.png",
    icon: <CurrencyRupeeOutlinedIcon />,
  },
  {
    id: 3,
    title: "Reach to Bus",
    desc: "lorem ipsum asd asd sd dw  asd  asd  cj jwkc kjo ck kj askjnasicnauicascnAJH  Yacu jyGWYUSDGIAIUCsduy AHIUSDHI  OIUHXJH HSIUD8ANCNKNOIJH IjOIJXIASHChjznch ",
    image:
      "https://img.freepik.com/premium-vector/time-travel-world-vector-design-travel-explore-world-different-countries_572288-755.jpg?w=2000",
    icon: <DirectionsBusFilledOutlinedIcon />,
  },
];
interface IBookingStepsProps {}

const BookingSteps: React.FunctionComponent<IBookingStepsProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<any | null>(null);

  const handleOpen = (i: number) => {
    setAnchorEl(i);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const singleImage = data.find((obj) => obj.id == anchorEl);

  return (
    <>
      <Container sx={{ py: 2 }}>
        <Grid container spacing={6}>
          {/* Booking Steps */}
          <Grid item xs={12} md={6}>
            {Array.isArray(data) &&
              data.map((step, i) => (
                <Grid container key={i} spacing={8}>
                  <Grid item xs={1}>
                    <Avatar
                      sx={{ backgroundColor: "#f7a707" }}
                      variant="rounded"
                    >
                      {step?.icon}
                    </Avatar>
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    sx={{ pb: 2 }}
                    onMouseEnter={() => handleOpen((i = step.id))}
                    onMouseLeave={handleClose}
                  >
                    <Typography sx={{ fontSize: 25, fontWeight: 600, pb: 1 }}>
                      {step?.title}
                    </Typography>
                    <Typography sx={{ fontSize: 15, fontWeight: 450 }}>
                      {step?.desc}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
          </Grid>
          {/* Steps Images */}
          <Grid item xs={12} md={6}>
            <Box sx={{ height: 400 }}>
              <img
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 9,
                  transition: "1s ease-in-out",
                }}
                src={singleImage?.image ? singleImage?.image : data[0]?.image}
                alt={singleImage?.title}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BookingSteps;
