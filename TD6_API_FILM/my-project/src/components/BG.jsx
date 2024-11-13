import React from "react";
import Fond from "/FOND.png";

function BG() {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bright-image"
      style={{
        backgroundImage: `url(${Fond})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 0,
      }}
    ></div>
  );
}

export default BG;
