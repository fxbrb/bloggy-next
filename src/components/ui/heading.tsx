import React, { FC } from "react";

interface HeadingProp {
  title: string;
  description: string;
}

const Heading: FC<HeadingProp> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
};

export default Heading;
