import * as React from 'react';
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import '../../../ui/owl-carousel/owl.css'; 
import BlogPost from '../blogs/BlogPost';
import {data} from "../blogs/BlogData";
import  Container from '@mui/material/Container';
import  Grid  from '@mui/material/Grid';
import Box from '@mui/material/Box';
interface IOwlCarouselProps {
}

const options = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: false,
    // navText: ["Prev", "Next"],
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

const BlogsHome: React.FunctionComponent<IOwlCarouselProps> = (props) => {
  return <>
  <h3>Blogs</h3>
  {/* <Grid container mb={8}> */}
          
        <Container><OwlCarousel 
          {...options}
          className="owl-theme owl-carousel nav-btn"
          lazyLoad={true}  
          loop  
          dots={false}
          nav={true}
          autoplay={false} 
          autoplayHoverPause={true}
          margin={8}
        
           >  
          {
            Array.isArray(data) && data?.map((blog, i) => {
                return (
        <Box sx={{mx:-2}}>
                <BlogPost 
                          id={blog?.id}
                          image={blog?.image}
                          title={blog?.title}
                          desc={blog?.desc}
                          key={blog?.id + i}
                          
                        />
                        </Box>
                        )
            })
          }
      </OwlCarousel> </Container> 
      {/* </Grid>  */}
 
  </>;
};

export default BlogsHome;