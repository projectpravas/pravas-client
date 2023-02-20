import * as React from "react";
import { useLocation } from "react-router-dom";
interface IStartFromTopProps {}

const StartFromTop: React.FunctionComponent<IStartFromTopProps> = (props) => {
  const currentLocation = useLocation();

  const startFromTop = () => {
    window.scroll(0, 0);
  };

  React.useEffect(() => {
    startFromTop();
  }, [currentLocation]);

  return <></>;
};

export default StartFromTop;
