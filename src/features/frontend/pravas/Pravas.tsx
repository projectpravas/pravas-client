import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import PravasPackageCard from "./PravasPackageCard";
import { Helmet } from "react-helmet";

interface IPravasProps {}

const Pravas: React.FunctionComponent<IPravasProps> = (props) => {
  const PackegeCard = [
    {
      id: 1,
      heading: "Hampi Badami",
      image: [
        "https://pravasthejourney.com/wp-content/uploads/2022/06/Hampi.jpg",
      ],
      price: " ₹15800 / P",
      duration: "5days",
      seatAvability: "15Seat",
    },
    {
      id: 2,
      heading: "Kashmir 4N5D",
      image: [
        "https://pravasthejourney.com/wp-content/uploads/2022/09/Kashmir-4n5d.webp",
      ],
      price: " ₹19850 / P",
      duration: "5days",
      seatAvability: "15Seat",
    },
    {
      id: 3,
      heading: "Kerala 5N6D",
      image: [
        "https://pravasthejourney.com/wp-content/uploads/2022/05/KeralaP1.jpg",
      ],
      price: " ₹19550 / P",
      duration: "6days",
      seatAvability: "15Seat",
    },

    {
      id: 4,
      heading: " Leh Ladakh 6N7D",
      image: [
        "https://pravasthejourney.com/wp-content/uploads/2021/09/kashmir.jpg",
      ],
      price: " ₹26800 / P",
      duration: "6days",
      seatAvability: "15Seat",
    },
    {
      id: 5,
      heading: "Leh Ladakh 8N9D",
      image: [
        "https://pravasthejourney.com/wp-content/uploads/2022/06/Leh-Ladakh.jpg",
      ],
      price: " ₹34800 / P",
      duration: "9days",
      seatAvability: "14Seat",
    },
    {
      id: 6,
      heading: "Pench",
      image: [
        "https://pravasthejourney.com/wp-content/uploads/2022/06/PRLeh.jpg",
      ],
      price: " ₹15850 / P",
      duration: "3days",
      seatAvability: "15Seat",
    },
    {
      id: 7,
      heading: "Rajasthan",
      image: [
        "https://pravasthejourney.com/wp-content/uploads/2022/06/PRPench.jpg",
      ],
      price: " ₹24450 / P",
      duration: "7days",
      seatAvability: "15Seat",
    },
    {
      id: 8,
      heading: "Tadoba",
      image: [
        "https://pravasthejourney.com/wp-content/uploads/2022/06/PRTadoba.jpg",
      ],
      price: " ₹24450 / P",
      duration: "7days",
      seatAvability: "15Seat",
    },
  ];
  return (
    <>
      <Helmet>
        <title>Pravas Tours</title>
        <meta name="description" content="Pravas Tourism" />
        <meta name="keywords" content="Pravas Tourism" />
      </Helmet>
      <Container>
        <Grid container marginY={10}>
          {Array.isArray(PackegeCard) &&
            PackegeCard.map((item, i) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  // marginRight: "-15px",
                  // marginLeft: "15px",
                }}
                key={item?.id + i}
              >
                <PravasPackageCard {...item} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default Pravas;
