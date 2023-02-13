import * as React from 'react';
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 
import '../../../ui/owl-carousel/pravas.css'; 
import TourService from "../../../services/TourService";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import PravasPackageCard from "../pravas/PravasPackageCard";
interface IPravasHomeProps {
}

const options = {
  margin: 30,
  responsiveClass: true,
  nav: true,
  dots: false,
  autoplay: false,
  navText: ["Prev", "Next"],
  smartSpeed: 1000,
  responsive: {
      0: {
          items: 1,
      },
      400: {
          items: 1,
      },
      600: {
          items: 2,
      },
      700: {
          items: 2,
      },
      1000: {
          items: 3,

      }
     
  },
};


const PravasHome: React.FunctionComponent<IPravasHomeProps> = (props) => {
  const [allPackageCardData, setAllPackageCardData] = React.useState<Array<any>>([]);

  const loadPackageData = () => {
    TourService.fetchAllTours()
    .then((response) => {
      console.log("loadPackages", response?.data?.data);
      let packages = response?.data?.data;
      setAllPackageCardData([...allPackageCardData, ...packages]);
    })
  }
  
  React.useEffect(() => {
    loadPackageData();
  },[]);

  return <>
  <h3>Pravas Home</h3>
  
  <Container >
    <OwlCarousel
  {...options}
  className="owl-theme owl-carousel"
  lazyLoad={true}  
  loop  
  dots={false}
  nav={true}
  autoplay={false} 
  autoplayHoverPause={true}
  margin={8}
    >
    {
    Array.isArray(allPackageCardData) && allPackageCardData.map((packageCardDetials, i) => {
           return   (    
       <Box >

            <PravasPackageCard 
           {...packageCardDetials}           
           _id={packageCardDetials?._id}
           images={packageCardDetials?.images}
           title={packageCardDetials?.title}
           key={packageCardDetials?._id + i}

            />
       </Box>  
           )
      })
    }
    </OwlCarousel>
  </Container>

  </> ;
};

export default PravasHome;