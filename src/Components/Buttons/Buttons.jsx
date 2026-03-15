import React from "react";

const Buttons = ({ title, img, className }) => {
  return (
    <button
      className={`bg-[#46A358] text-white flex items-center gap-2 rounded-xl ${className}`}
    >
      {" "}
      {title}, {img && <img src={img} alt="icon" />}
    </button>
  );
};

export default Buttons;
