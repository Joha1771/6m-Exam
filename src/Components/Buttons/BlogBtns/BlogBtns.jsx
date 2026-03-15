import React from "react";
import rightArrow from "../../../assets/Icons/arrow-right.svg";
const BlogBtns = ({ classname }) => {
  return (
    <button className={`flex items-center gap-2 ${classname}`}>
      Read More <img src={rightArrow} alt="Right Arrow" />
    </button>
  );
};

export default BlogBtns;
