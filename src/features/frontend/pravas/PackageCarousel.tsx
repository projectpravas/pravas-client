import * as React from 'react'; 
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 
import "../../../ui/owl-carousel/pravas.css";
import PravasHome from '../home/PravasHome';

interface IPackageCarouselProps {
}
const PackageCarousel: React.FunctionComponent<IPackageCarouselProps> = (props) => {
    
return <>
  <PravasHome />
  </>;
};

export default PackageCarousel;
