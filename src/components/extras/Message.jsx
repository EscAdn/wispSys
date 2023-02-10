import React from "react";

const Message = ({ msg, bg = "danger" }) => {
  return (
    <div className={`alert alert-${bg}`} role="alert">
      {msg}
    </div>
  );
};

export default Message;
