import * as React from "react";
import CountUp from "react-countup";

interface ICounterProps {
  end: number;
  duration?: number;
}

const Counter: React.FunctionComponent<ICounterProps> = ({
  end,
  duration = 2,
}) => {
  return (
    <>
      <CountUp delay={0.7} duration={duration} end={end} />
    </>
  );
};

export default Counter;
