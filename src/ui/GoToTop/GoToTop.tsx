import React from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

interface IGoToTopProps {}

const GoToTop: React.FunctionComponent<IGoToTopProps> = (props) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const listenToScroll = () => {
    let hightToHidden = 250;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > hightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const Wrapper = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;

    .top-btn {
      font-size: 2.4rem;
      width: 3rem;
      height: 3rem;
      color: #fff;
      background-color: #f7a707;
      border-radius: 50%;
      position: fixed;
      bottom: 3rem;
      right: 3rem;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .top-btn-icon {
      animation: gototop 1.2s linear infinite alternative-reverse;
    }
  `;
  return (
    <Wrapper>
      {isVisible && (
        <div className="top-btn" onClick={goToBtn}>
          <KeyboardDoubleArrowUpIcon className="top-btn-icon" />
        </div>
      )}
    </Wrapper>
  );
};

export default GoToTop;
