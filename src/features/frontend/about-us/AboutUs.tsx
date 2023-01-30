import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import { width } from '@mui/system';
interface IAboutUsProps {}

const AboutUs: React.FunctionComponent<IAboutUsProps> = (props:any) => {

    const Item = styled(Box)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

      const MyCard = styled(Card)({
        ":hover":{boxShadow:"0.5px 0.5px 20px grey"},
        maxWidth:"18%",
        maxHeight:"60%",  
      });

 const typoName = {
    fontSize:"25px",
    fontWeight:600,
    lineHeight:"1.3em",
    color:"#005d9d",
    padding:"4% 0 1% 0"
 }

 const typePosition = {
  fontSize:"15px",
  fontWeight:400,
  lineHeight:"1.3em",
  color:"#b0b0b0",
  padding:"1% 0 5% 0"
 }

 const typoPara = {
  padding: "4% 2% 0 2%", lineHeight: "24px", fontSize: "16px",
  letterSpacing: "-.2px", fontWeight: "400", lineheight: "1.5", textAlign:"left"  
 }

 const typoVision = {
  color: "#005d9d", fontSize:"30px", letterSpacing: "2px", 
        textTransform: "uppercase", fontWeight: "600", textIndent: 0, textAlign:"left",lineHeight:1.3
 }

 const typoVpara = {
  color:"#333333", padding:"4% 1rem 0 0", textAlign:"left", 
            fontWeight:400, lineHeight:1.6, fontSize:"16px"
 }

 return <>

    <Grid container sx={{ flexWrap:"wrap", padding:"3% 6% 2% 6%", margin:"2% 0 8% 0" }}>

        <Grid item xs={12} md={6} lg={6} > 
          <Item sx={{backgroundColor:"transparent" }} >

           <Typography style={{fontSize:"39px", color:"#005d9d", fontWeight:"600",
            textAlign:"left", lineHeight: "1.3em",padding:"0% 2% 0 2%" }} component="h2">
            Explore the world and create memories that will last a lifetime
            </Typography>  {/* heading*/}

          <Typography  sx={typoPara} >
        Pravas – A chance to rush-n-crush the daily routine moreover has some peaceful moments. Or get over boredom and be far from a problem or stress. Pravas ensures travellers to have a great traveling experience after visiting their dream destinations either on a customize tour or with a group tour. You will get a chance to enjoy local foods, team up with local people, visit heritage monuments and much more. 
          </Typography>  {/* P1*/}

          <Typography  sx={typoPara} >
        Pravas is there whether you are planning to go for a honeymoon, a romantic getaway with your spouse or planning to have an adventurous holiday with your friends. Our Taylor made tours will always be much more than you expect. Travel with team Pravas and be on a journey of smiles.
          </Typography>  {/* P2*/}
          </Item>
        </Grid> 
       
        <Grid item xs={12} md={6} lg={6} sx={{ alignItems:"center" }}>
         <Item sx={{backgroundColor:"transparent"}}>   
         <Typography sx={{ padding: "1% 2% 0 2%", lineHeight: "24px", fontSize: "16px",
  letterSpacing: "-.2px", fontWeight: "400", lineheight: "1.5", textAlign:"left"  }}>
         Moreover, it is full of excitement, recreation, innovation, leisure, and desire. For some people, travelling can be a time of self-realization, and for some, it is the way of exploration and getting new experiences. There isn’t any doubt about – Traveling holds power to shape life positively.
         </Typography>
          <img src='https://pravasthejourney.com/wp-content/uploads/2022/06/team.jpg' style={{ marginTop:"6%"}} width="95%" alt="" />
         </Item>

        </Grid>
       
    </Grid>{/*explore*/}

    <Grid container pt={7} pb={10} sx={{ flexWrap:"wrap", bgcolor:"#005d9d"}} xs={12}>

        <Grid xs={12} sm={12} md={6} >
         <Item  sx={{backgroundColor:"transparent", height:"92%" , width:{xs:"100%", lg:"84%"},  paddingLeft:"0%",}}>
            <img  src='https://pravasthejourney.com/wp-content/uploads/2022/06/RD_03845-HDR-scaled.jpg' width="100%" height="100%" />
         </Item> {/*img*/}
        </Grid>{/*img*/}

        <Grid  xs={12} sm={12} md={6} sx={{ alignContent:"left" }}>
            <Item sx={{backgroundColor:"transparent" , textAlign:"left",  padding:{xs:"10%" , sm:"2% 10% 0 12%" , md:"6% 12% 0 12%", lg:"6% 12% 0 0" } }}>

            <Typography sx={{fontSize: {xs:"1.8rem", md:'1.8rem', lg:"2rem"}, color:"#fff", fontWeight:"600",
             lineHeight:"1.3em", textAlign:"left"}}>Ajit Ashok Takalkar</Typography>
           
           <Typography sx={{color:"#FDF1C9",textAlign:"left",fontSize: {xs:"1.8rem", md:"1.2rem", lg:"1.3rem"}, marginTop:"15px",
            marginBottom:"15px", lineHeight:1.2, fontWeight:"500" }}>Chief Discoverer & Founder</Typography>

           <Typography sx={{color: "#fff", textAlign:{xs:"left", lg:"left"}, fontSize:"16px",
           fontWeight: 400, lineHeight: "25px"}}>A MAN OF BONDING WITH TRAVELLING, HISTORY AND HERITAGE. Some people are crazy about travel, they always look for new places to move and make persistent plans. And Mr. Ajit is one among them who has planned 350+ tours and has completed around 250+ treks and explored many forts, heritage places through India. With every trip, he gained experience and came to know exactly what the tourists likes. His attachment, eagerness forced him to step in the travel business. And from past 10+ years he is planning some distinctive trips to destinations across the globe. That’s why his tours are exceptional and attract more travellers.</Typography>
            
            </Item>
        
        </Grid>

    </Grid>{/*ceo*/}

      <Grid container sx={{ flexWrap:"wrap", bgcolor:"#f7fafc", padding:"6%"}}>

        <Grid item xs={12} sm={6} p={2}>
            <Typography sx={typoVision}>VISION</Typography>

            <Typography sx={typoVpara}>
            Our primary focus is on cherishing the small moments like – the haunting tunes of a local song, the enticing smells of a spice market, the sunset during a jungle safari or the brilliant light of a thousand diyas at a temple. We always find something new and different to offer in terms of heritage, architecture, and experience. We take you to the quiet place where you can breathe fresh, spend quality time, and revive your energy to grow further. We are focused to give all these treasures all in one tour.
           <br/>
           <br/>
           Pravas is there whether you are planning to go for a honeymoon, a romantic getaway with your spouse or planning to have an adventurous holiday with your friends. Our Taylor made tours will always be much more than you expect. Travel with team Pravas and be on a journey of smiles.
            </Typography>
        </Grid>{/*vision*/}

        <Grid item xs={12} sm={6} p={2}>
            <Typography sx={typoVision}>
            CORE VALUES
            </Typography>

            <Typography sx={typoVpara}>
          Pravas has an enthusiastic, passionate team who are delivering ‘out-of-the-world’ travel experiences. They are playing a pivotal role in finding and managing tours at some of the most beautiful domestic as well as international locations.
          <br />
          <br />
          Pravas is there whether you are planning to go for a honeymoon, a romantic getaway with your spouse or planning to have an adventurous holiday with your friends. Our Taylor made tours will always be much more than you expect. Travel with team Pravas and be on a journey of smiles.
         
            </Typography>
        </Grid> {/*core*/}
  
     </Grid> {/*Vision*/}

     <Grid container  sx={{ flexWrap:"wrap", minWidth:"xs"}}>
       <Box  sx={{  height: '70%', width: '100%', bgcolor:"#f4f3ef", alignItems:"center", padding:"6%" }}>
      
       <Typography sx={{fontSize:"50px", display:"flex", justifyContent:"center", fontWeight:700, lineHeight:1.2, marginBottom:"3%",color:"#2e2e3e" }}>
        Meet the Team
       </Typography>

       <Item  sx={{display:"flex", justifyContent:"space-evenly", bgcolor:"transparent"}}>
       
       <MyCard  >
        <CardMedia
          component="img"
          height="250rem"
          image="https://pravasthejourney.com/wp-content/uploads/2022/06/Akshay.jpg"
          alt="green iguana"
          />
          <Typography sx={typoName}>Akshay</Typography>
          <Typography sx={typePosition}>DIRECTOR</Typography>    
       </MyCard>
     
       <MyCard >
          <CardMedia
          component="img"
          height="250rem"
          image="https://pravasthejourney.com/wp-content/uploads/2022/06/Asha.jpg"
          alt="green iguana"
          /> 
          <Typography sx={typoName}>Asha</Typography>
          <Typography sx={typePosition}>ACCOUNTS HEAD</Typography>
       </MyCard>

       </Item>

       </Box>
     </Grid> {/*team*/}

  </>;
};

export default AboutUs;
