import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import Avatar from "@mui/material/Avatar";

const data = [
  {
    id: 1,
    title: "Find Your Destination",
    desc: "We offer a variety of travel options. Choose your dream destination and plan your journey of smiles with us.",
    image: "../home-steps-img/destination.webp",
    icon: <RoomOutlinedIcon />,
  },
  {
    id: 2,
    title: "Fill Your Details",
    desc: "We belive vacations are to relax, explore and spend quality time with your lovedones. So share your details and our team will plan a journey for you.",
    image: "../home-steps-img/fill-details.jpeg",
    icon: <ListAltOutlinedIcon />,
  },
  {
    id: 3,
    title: "Make Payment",
    desc: "Choose your payment option and easily pay for what you have opt for.",
    image: "../home-steps-img/make-payment.webp",
    icon: <CurrencyRupeeOutlinedIcon />,
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
        <Grid
          container
          spacing={4}
          sx={{ px: 3 }}
          justifyContent="center"
          alignItems="center"
        >
          {/* Booking Steps */}
          <Grid item xs={12} md={6} alignSelf="center">
            {Array.isArray(data) &&
              data.map((step, i) => (
                <Grid container key={i} spacing={8}>
                  <Grid item xs={1}>
                    <Avatar
                      sx={{ backgroundColor: "#f7a707" }}
                      variant="circular"
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
                    <Typography sx={{ fontSize: 22, fontWeight: 600, pb: 1 }}>
                      {step?.title}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14, fontWeight: 450, color: "#5d5d5d" }}
                    >
                      {step?.desc}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
          </Grid>
          {/* Steps Images */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <img
                style={{
                  width: "100%",
                  // height: "100%",
                  objectFit: "cover",
                  borderRadius: 9,
                  transition: "1s ease-in-out",
                }}
                src={singleImage?.image ? singleImage?.image : data[0]?.image}
                // src="../home-steps-img/destination.webp"
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
