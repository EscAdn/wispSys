import React from "react";

const Loading = () => {
  return (
    <div className="col-sm-12 p-3 m-auto text-center">
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
