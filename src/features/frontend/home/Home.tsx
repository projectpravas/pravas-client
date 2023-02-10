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

interface IHomeProps {}

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
      <SearchBar />
     </Grid>
     
     {/* Youtube video section */}
     {/* <Grid container pt={15} pl={10} pr={10}>
      <Grid item xs={12} md={6}>
      <a href="https://www.youtube.com/watch?v=NYlnaBkB7RY" target="blank" style={{width:"100%"}}>
       <img width="560" height="315" src="https://pravasthejourney.com/wp-content/uploads/2022/09/omkar-mulgund.webp" alt="not" />
       </a>
      </Grid>
      <Grid item xs={12} md={6}  >
       <label>WORLD OF SMILES.</label>
        <Typography>Pravas - A chance to rush-n-crush the daily routine moreover has some peaceful moments. Or get over boredom and be far from a problem or stress. We will take you to the quiet place where you can breathe fresh, spend quality time, revives your energy to grow further. Yes, you can find all these treasures all-in-one trip.</Typography>
      </Grid>
     </Grid> */}

     {/* blogs cards carousel  */}
     <BlogsHome />

     {/* Pravas cards carousel  */}
      {/* <PravasHome /> */}
      
      <Helmet>
        <title>Pravas Tourism</title>
        <meta name="description" content="Pravas Tourism" />
        <meta name="keywords" content="Pravas Tourism" />
      </Helmet>

       {/* gallery  */}
      {/* <TourGallery /> */}
    </>
  );
};

export default Home;
