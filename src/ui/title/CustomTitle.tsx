import * as React from "react";

interface ICustomTitleProps {
  title: String;
}

const CustomTitle: React.FunctionComponent<ICustomTitleProps> = ({ title }) => {
  const tp1 = title.slice(0, 4);
  const tp2 = title.slice(4, title.length);
  return (
    <div>
      <h1 style={{ color: "#27488d", display: "inline-block" }}>{tp1}</h1>
      <h1 style={{ color: "#f7a707", display: "inline-block" }}>{tp2}</h1>
    </div>
  );
};

export default CustomTitle;
