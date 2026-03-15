import React from "react";
import Cards from "../Cards/Cards";
import Pagination from "../Skeleton/Skeleton";

const Products = () => {
  return (
    <section className="pb-[100px]">
      <div className="container">
        <div>
          <ul className="flex items-center gap-[30px]">
            <li>All Plants</li>
            <li>New Arrivals</li>
            <li>Sale</li>
          </ul>
        </div>
        <div className="pt-[50px]">
          <Cards />
        </div>
      </div>
    </section>
  );
};

export default Products;
