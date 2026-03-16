import React from "react";
import shop1 from "../../assets/Images/shop1.png";
import shop2 from "../../assets/Images/shop2.png";

const DesktopShop = () => {
  return (
    <section className="hidden md:block">
      <div className="max-w-[1200px] mx-auto px-8 pb-20">
        <div className="grid grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-[#f7f6f6] rounded-2xl overflow-hidden flex items-center gap-6 px-8 py-8">
            <img src={shop1} alt="Summer Cactus" className="w-[160px] object-contain shrink-0" />
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold text-gray-800 leading-snug">
                Summer Cactus<br />& Succulents
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                We are an online plant shop offering a wide range of cheap and trendy plants.
              </p>
              <button className="flex items-center gap-2 bg-[#46A358] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#3d9450] transition-colors w-fit">
                Find More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#f7f6f6] rounded-2xl overflow-hidden flex items-center gap-6 px-8 py-8">
            <img src={shop2} alt="Styling Trends" className="w-[160px] object-contain shrink-0" />
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold text-gray-800 leading-snug">
                Styling Trends<br />& Much More
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                We are an online plant shop offering a wide range of cheap and trendy plants.
              </p>
              <button className="flex items-center gap-2 bg-[#46A358] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#3d9450] transition-colors w-fit">
                Find More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesktopShop;
