import * as React from 'react';
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import './owl.css'; 
import BlogPost from '../blogs/BlogPost';
import {data} from "../blogs/BlogData";
import { Grid } from '@mui/material';
interface IOwlCarouselProps {
}

const BlogsHome: React.FunctionComponent<IOwlCarouselProps> = (props) => {
  return <>
  <h3>Blogs</h3>
  <Grid container mb={8}>
          
        <OwlCarousel items={3}   
          className="owl-theme owl-carousel nav-btn"
          lazyLoad={true}  
          loop  
          dots={false}
          nav={true}
          autoplay={true} 
          autoplayHoverPause={true}
          margin={8}
        
           >  
          {
            Array.isArray(data) && data?.map((blog, i) => {
                return <BlogPost 
                          id={blog?.id}
                          image={blog?.image}
                          title={blog?.title}
                          desc={blog?.desc}
                          key={blog?.id + i}
                        />
            })
          }
      </OwlCarousel>  
      </Grid> 
 
  </>;
};

export default BlogsHome;