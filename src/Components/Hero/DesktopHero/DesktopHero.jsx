import React, { useState, useRef, useEffect } from "react";
import api from "../../../Config/axios.config";

const DesktopHero = () => {
  const [slides, setSlides] = useState([]);
  const [active, setActive] = useState(0);
  const [animState, setAnimState] = useState("idle");
  const [direction, setDirection] = useState("left");
  const startX = useRef(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    const get = async () => {
      try {
        const res = await api.get("/products");
        setSlides(res.data.products.slice(0, 3));
      } catch (e) {
        console.log(e);
      }
    };
    get();
  }, []);

  const goTo = (index, dir) => {
    if (isAnimating.current || index === active) return;
    isAnimating.current = true;
    setDirection(dir);
    setAnimState("exit");
    setTimeout(() => {
      setActive(index);
      setAnimState("enter");
      setTimeout(() => {
        setAnimState("idle");
        isAnimating.current = false;
      }, 300);
    }, 300);
  };

  const handleTouchStart = (e) => (startX.current = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50 && active < slides.length - 1) goTo(active + 1, "left");
    else if (diff < -50 && active > 0) goTo(active - 1, "right");
    startX.current = null;
  };

  const handleMouseDown = (e) => (startX.current = e.clientX);
  const handleMouseUp = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.clientX;
    if (diff > 50 && active < slides.length - 1) goTo(active + 1, "left");
    else if (diff < -50 && active > 0) goTo(active - 1, "right");
    startX.current = null;
  };
  const handleMouseLeave = () => (startX.current = null);

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

  const slide = slides[active];

  return (
    <section className="hidden md:block mt-[70px]">
      <div className="max-w-[1200px] mx-auto px-8 py-10">
        <div
          className="bg-[#e8f5e9] rounded-2xl overflow-hidden flex items-center justify-between px-16 py-12 min-h-[380px] relative cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Text */}
          <div
            className={`flex-1 max-w-[480px] transition-all duration-300 ease-in-out ${getAnimClass()}`}
          >
            {slide ? (
              <>
                <p className="text-[#46A358] text-xs font-bold uppercase tracking-widest mb-3">
                  Welcome to GreenShop
                </p>
                <h1
                  className="text-[#1b3a2e] text-5xl font-extrabold leading-tight mb-4"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Let's Make a<br />
                  Better <span className="text-[#46A358]">Planet</span>
                </h1>
                <p className="text-[#4a7c59] text-sm leading-relaxed mb-8 max-w-[360px]">
                  {slide.description ||
                    "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle."}
                </p>
                <button className="bg-[#46A358] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#3d9450] transition-colors text-sm">
                  SHOP NOW
                </button>
              </>
            ) : (
              <div className="space-y-4 animate-pulse">
                <div className="h-3 bg-[#c8e6c9] rounded w-32" />
                <div className="h-10 bg-[#c8e6c9] rounded w-64" />
                <div className="h-3 bg-[#c8e6c9] rounded w-80" />
                <div className="h-10 bg-[#c8e6c9] rounded w-32" />
              </div>
            )}
          </div>

          {/* Image */}
          <div
            className={`w-[340px] shrink-0 transition-all duration-300 ease-in-out ${getAnimClass()}`}
          >
            {slide?.pictures?.[0] ? (
              <img
                src={slide.pictures[0]}
                alt={slide.name}
                className="w-full object-contain drop-shadow-xl"
                style={{ maxHeight: 320 }}
              />
            ) : (
              <div className="w-full h-[320px] bg-[#c8e6c9] rounded-2xl animate-pulse" />
            )}
          </div>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > active ? "left" : "right")}
                className={`rounded-full transition-all duration-300 ${active === i ? "w-6 h-2.5 bg-[#46A358]" : "w-2.5 h-2.5 bg-[#b7d9c2]"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesktopHero;
