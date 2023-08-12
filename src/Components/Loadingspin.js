import React, { Component } from "react";
import loading from "./loading.gif";
const Loadingspin = () => {
  return (
    <div className="text-center ">
      <img
        src={loading}
        alt="loading"
        style={{ height: "40px", width: "50px" }}
      />
    </div>
  );
};

export default Loadingspin;
