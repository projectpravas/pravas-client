import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SearchBar from "./SearchBar";
import { Helmet } from "react-helmet";
import BlogPost from "../blogs/BlogPost";
import {data} from "../blogs/BlogData";
import BlogsHome from "./BlogsHome";
import PravasHome from "./PravasHome";
import TourGallery from "../../../ui/tour-gallary/TourGallary";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { hover } from "@testing-library/user-event/dist/hover";
import { color } from "@mui/system";
import { NavLink } from "react-router-dom";

interface IHomeProps {}

const seeMore = {
  fontSize:"1.12rem", backgroundColor:"#2c5799", color:"#fff", fontWeight:500, letterSpacing:"2px",
  padding:"10px 20px", lineHeight:1, borderRadius:"8px", border:"2px solid #2c5799",
  "&:hover" : {
    color:"#2c5799",
    backgroundColor:"#fff",
    border:"2px solid #2c5799",
    transition:"0.2s",
    
  }
}


const typohead = {
 fontFamily:"Caveat,Sans-serif",
}
const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <>

     <Grid container sx={{position:"relative"}}>
      <Grid >
      <img src="https://pravasthejourney.com/wp-content/uploads/2022/09/Web-C2.jpg" width="100%" alt="not" />
      <Typography sx={{position:"absolute", top:"32%", left:'8%',
       fontSize:"2.8rem", fontFamily:" cursive", fontStyle:"italic", 
       color:"white", textShadow:"0 0 10px rgb(0 0 0 / 30%)", 
       maxWidth: "1140px", minHeight:"500px", fontWeight:500, lineHeight:1.2, letterSpacing:-1
       }}>Bun ke pravasee <br/>
       dekho apna desh!</Typography>    
      </Grid>
      
      {/* Search Bar  */}
      <SearchBar />
     </Grid>
     
     {/* Youtube video section */}
   <Container>
   <Grid container pt={15} pb={10} spacing={8}>
      <Grid item xs={12} md={6}>
      <a href="https://www.youtube.com/watch?v=NYlnaBkB7RY" target="blank" style={{width:"100%"}}>
       <img width="560" height="315" src="https://pravasthejourney.com/wp-content/uploads/2022/09/omkar-mulgund.webp" alt="not" />
       </a>
      </Grid>

      <Grid item xs={12} md={6}  >
       <Typography sx={{fontFamily:"monospace", color:"#f39100", fontSize:"1.25rem"}}>Experiance</Typography>
       <Typography variant="h3" sx={{fontWeight:700, color:"#313041", lineHeight:1.2}}>WORLD OF SMILES.</Typography>
        <Typography sx={{paddingTop:"2.1rem", paddingBottom:"1.2rem", lineHeight:"1.86em", color:"#90929b", letterSpacing:".-2px"}}>Pravas - A chance to rush-n-crush the daily routine moreover has some peaceful moments. Or get over boredom and be far from a problem or stress. We will take you to the quiet place where you can breathe fresh, spend quality time, revives your energy to grow further. Yes, you can find all these treasures all-in-one trip.</Typography>
       <NavLink to="/about-us">
        <Button sx={seeMore}>
          See More
        </Button>
        </NavLink>
      </Grid>
     </Grid>
   </Container>

     {/* blogs cards carousel  */}
     <BlogsHome />

     {/* Pravas cards carousel  */}
      <PravasHome />
      
      {/* <Helmet>
        <title>Pravas Tourism</title>
        <meta name="description" content="Pravas Tourism" />
        <meta name="keywords" content="Pravas Tourism" />
      </Helmet> */}

       {/* gallery  */}
      {/* <TourGallery /> */}
    </>
  );
};

export default Home;
