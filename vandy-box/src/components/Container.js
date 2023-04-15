import React from "react";

const Container = ({ containerTitle, children, ...rest }) => {
  return (
    <div className="p-4 m-4 space-y-3 bg-yellow-100 rounded-2xl shadow-xl">
      <div className="flex">
        <span className="text-xl font-bold">{containerTitle}</span>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Container;
