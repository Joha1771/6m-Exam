import React, { useState, useRef, useEffect } from "react";
import api from "../../../Config/axios.config";

const MobileHero = () => {
  const [slides, setSlides] = useState([]);
  const [active, setActive] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [animState, setAnimState] = useState("idle");
  const [direction, setDirection] = useState("left");
  const startX = useRef(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await api.get(`/products`);
        setSlides(res.data.products.slice(0, 3));
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, []);

  const goTo = (index, dir) => {
    if (isAnimating.current || index === active) return;
    isAnimating.current = true;
    setDirection(dir);

    setAnimState("exit");

    setTimeout(() => {
      setActive(index);
      setDisplayed(index);
      setAnimState("enter");

      setTimeout(() => {
        setAnimState("idle");
        isAnimating.current = false;
      }, 300);
    }, 300);
  };

  const handleMouseDown = (e) => (startX.current = e.clientX);
  const handleMouseUp = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.clientX;
    if (diff > 50 && active < slides.length - 1) goTo(active + 1, "left");
    else if (diff < -50 && active > 0) goTo(active - 1, "right");
    startX.current = null;
  };

  const handleTouchStart = (e) => (startX.current = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50 && active < slides.length - 1) goTo(active + 1, "left");
    else if (diff < -50 && active > 0) goTo(active - 1, "right");
    startX.current = null;
  };

  const getAnimClass = () => {
    if (animState === "exit")
      return direction === "left"
        ? "-translate-x-10 opacity-0"
        : "translate-x-10 opacity-0";
    if (animState === "enter")
      return direction === "left"
        ? "translate-x-10 opacity-0"
        : "-translate-x-10 opacity-0";
    return "translate-x-0 opacity-100";
  };

  const slide = slides[displayed];

  return (
    <section
      className="mx-4 my-4 rounded-2xl overflow-hidden bg-[#e8f5e9] select-none cursor-grab mt-[100px]"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex items-center justify-between px-5 pt-6 pb-4 min-h-[160px]">
        <div
          className={`flex-1 pr-4 transition-all duration-300 ease-in-out ${getAnimClass()}`}
        >
          {slide ? (
            <>
              <p className="text-[#2d6a4f] text-xs font-semibold uppercase tracking-wider mb-1">
                {slide.category}
              </p>
              <h1 className="text-[#1b3a2e] text-2xl font-extrabold leading-tight mb-2">
                {slide.name}{" "}
                <span className="text-[#46a359]">${slide.price}</span>
              </h1>
              <p className="text-[#4a7c59] text-sm leading-snug mb-4 line-clamp-2">
                {slide.description}
              </p>
              <button className="flex items-center gap-2 text-[#46a359] font-bold text-sm ">
                Shop Now →
              </button>
            </>
          ) : (
            <div className="space-y-2 animate-pulse">
              <div className="h-3 bg-[#c8e6c9] rounded w-24" />
              <div className="h-6 bg-[#c8e6c9] rounded w-36" />
              <div className="h-3 bg-[#c8e6c9] rounded w-32" />
            </div>
          )}
        </div>

        <div
          className={`w-[140px] shrink-0 transition-all duration-300 ease-in-out ${getAnimClass()}`}
        >
          {slide?.pictures?.[0] ? (
            <img
              src={slide.pictures[0]}
              alt={slide.name}
              className="w-full object-contain rounded-xl"
            />
          ) : (
            <div className="w-full h-[120px] bg-[#c8e6c9] rounded-xl animate-pulse" />
          )}
        </div>
      </div>

      <div className="flex justify-center gap-2 pb-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > active ? "left" : "right")}
            className={`rounded-full transition-all duration-300 ${
              active === i ? "w-4 h-3 bg-[#46a359]" : "w-3 h-3 bg-[#b7d9c2]"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default MobileHero;
