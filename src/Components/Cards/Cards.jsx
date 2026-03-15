import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../Config/axios.config";
import Skeleton from "../Skeleton/Skeleton";

const Cards = () => {
  const [slides, setSlides] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 4;

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(
          `/products?page=${currentPage}&limit=${limit}`,
        );
        setSlides(res.data.products);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, [currentPage]);
  const pages = Array.from({ length: 4 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-5">
        {isLoading
          ? Array.from({ length: limit }, (_, i) => <Skeleton key={i} />)
          : slides.map((slide) => (
              <Link
                key={slide.id}
                to={`/products/${slide.id}`}
                className="max-w-[175px] flex flex-col gap-[9px]"
              >
                <img
                  src={slide.pictures[0]}
                  alt={slide.name}
                  className="rounded-xl bg-[#f8f8f8] aspect-square object-cover"
                />
                <h3 className="font-medium">{slide.name}</h3>
                <p className="text-[#46A358] font-bold">
                  ${slide.price.toFixed(2)}
                </p>
              </Link>
            ))}
      </div>

      <div className="flex items-center gap-2 justify-end">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 flex items-center justify-center rounded border transition-all ${
              currentPage === page
                ? "bg-[#46A358] text-white border-[#46A358]"
                : "bg-white text-gray-500 border-gray-200 hover:border-[#46A358]"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 4))}
          className="w-10 h-10 flex items-center justify-center rounded border border-gray-200 text-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Cards;
