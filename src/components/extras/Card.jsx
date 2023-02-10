import React from "react";

const Card = ({ md, children }) => {
  return <div className={`col-sm-12 ${md} card p-2`}>{children}</div>;
};

export default Card;
