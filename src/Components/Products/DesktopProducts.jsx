import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../Config/axios.config";

const tabs = ["All Plants", "New Arrivals", "Sale"];
const limit = 9;

const DesktopProducts = () => {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("All Plants");
  const [hoveredId, setHoveredId] = useState(null);
  const totalPages = 4;

  useEffect(() => {
    const get = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(
          `/products?page=${currentPage}&limit=${limit}`,
        );
        setSlides(res.data.products);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    get();
  }, [currentPage]);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className="hidden md:block">
      <div className="max-w-[1200px] mx-auto px-8 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-8 border-b border-gray-100 w-full pb-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-semibold pb-3 -mb-3 border-b-2 transition-all ${
                  activeTab === tab
                    ? "text-[#46A358] border-[#46A358]"
                    : "text-gray-500 border-transparent hover:text-[#46A358]"
                }`}
              >
                {tab}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 text-sm text-gray-500 pb-3 -mb-3">
              <span>Sort by:</span>
              <select className="outline-none text-gray-700 font-medium bg-transparent cursor-pointer">
                <option>Default sorting</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-7">
          {isLoading
            ? Array.from({ length: limit }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3 animate-pulse">
                  <div className="aspect-square bg-gray-100 rounded-xl" />
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                  <div className="h-4 bg-gray-100 rounded w-1/3" />
                </div>
              ))
            : slides.map((slide) => (
                <Link
                  key={slide._id}
                  to={`/products/${slide._id}`}
                  className="flex flex-col gap-3 group"
                  onMouseEnter={() => setHoveredId(slide._id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="relative aspect-square bg-[#f8f8f8] rounded-xl overflow-hidden">
                    <img
                      src={slide.pictures[0]}
                      alt={slide.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {slide.discount > 0 && (
                      <span className="absolute top-3 right-3 bg-[#46A358] text-white text-xs font-bold px-2 py-1 rounded-full">
                        {slide.discount}% OFF
                      </span>
                    )}
                    {/* Hover actions */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 bg-white/90 py-3 transition-all duration-300 ${hoveredId === slide._id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    >
                      <button
                        className="p-2 hover:text-[#46A358] transition-colors"
                        title="Add to cart"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                      </button>
                      <button
                        className="p-2 hover:text-[#46A358] transition-colors"
                        title="Wishlist"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                      <button
                        className="p-2 hover:text-[#46A358] transition-colors"
                        title="Quick view"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.35-4.35" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#46A358] transition-colors">
                    {slide.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[#46A358] font-bold">
                      ${slide.price.toFixed(2)}
                    </span>
                    {slide.discount > 0 && (
                      <span className="text-gray-400 text-sm line-through">
                        ${(slide.price / (1 - slide.discount / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 flex items-center justify-center rounded border transition-all text-sm font-medium ${
                currentPage === page
                  ? "bg-[#46A358] text-white border-[#46A358]"
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#46A358] hover:text-[#46A358]"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="w-10 h-10 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:border-[#46A358] hover:text-[#46A358] transition-all"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DesktopProducts;
