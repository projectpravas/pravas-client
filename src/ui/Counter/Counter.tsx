import * as React from "react";
import CountUp from "react-countup";

interface ICounterProps {
  end: number;
  duration?: number;
  delay?: number;
}

const Counter: React.FunctionComponent<ICounterProps> = ({
  end,
  duration = 2,
  delay = 0.7,
}) => {
  return (
    <>
      <CountUp delay={delay} duration={duration} end={end} />
    </>
  );
};

export default Counter;
