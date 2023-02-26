// import * as React from "react";
// import { useState } from "react";

// import Grid from "@mui/material/Grid";
// import Carousel from "react-bootstrap/Carousel";

// interface ILocationClickProps {}

// const LocationClick: React.FunctionComponent<ILocationClickProps> = (props) => {
//   const [index, setIndex] = useState<number>(0);

//   const handleSelect = (selectIndex: number, e: any) => {
//     setIndex(selectIndex);
//   };

//   return (
//     <Grid sx={{ backgroundColor: "black" }}>
//       <Grid>
//         <Carousel activeIndex={index} onSelect={handleSelect}>
//           <Carousel.Item style={{ width: "100%", height: "100vh" }}>
//             <img
//               className="d-block w-100 h-50"
//               src="https://pravasthejourney.com/wp-content/uploads/2021/09/KASHMIR4.jpg"
//               alt="First slide"
//             />
//             <Carousel.Caption>
//               <h3>First slide label</h3>
//               <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//             </Carousel.Caption>
//           </Carousel.Item>
//           <Carousel.Item style={{ width: "100%", height: "100vh" }}>
//             <img
//               className="d-block w-100 h-100"
//               src="https://pravasthejourney.com/wp-content/uploads/2021/09/KASHMIR4.jpg"
//               alt="Second slide"
//             />

//             <Carousel.Caption>
//               <h3>Second slide label</h3>
//               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//             </Carousel.Caption>
//           </Carousel.Item>
//           <Carousel.Item style={{ width: "100%", height: "100vh" }}>
//             <img
//               className="d-block w-100 h-100"
//               src="https://pravasthejourney.com/wp-content/uploads/2021/09/KASHMIR4.jpg"
//               alt="Third slide"
//             />

//             <Carousel.Caption>
//               <h3>Third slide label</h3>
//               <p>
//                 Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//               </p>
//             </Carousel.Caption>
//           </Carousel.Item>
//         </Carousel>
//       </Grid>
//     </Grid>
//   );
// };

// export default LocationClick;
import React, { useEffect, useState } from "react";

import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box, Grid } from "@mui/material";

interface ILocationClickProps {
  items: Array<any>;
}

const LocationClick: React.FunctionComponent<ILocationClickProps> = ({
  items,
}) => {
  console.log(items);

  return (
    <Grid sx={{ display: "flex" }}>
      <Carousel sx={{ width: "700px" }}>
        {items?.map((image, i) => (
          <Box key={i}>
            <img
              style={{ width: "700px", height: "550px" }}
              src={`http://localhost:9999/${image}`}
            />
          </Box>
        ))}
      </Carousel>
    </Grid>
  );
};

export default LocationClick;
