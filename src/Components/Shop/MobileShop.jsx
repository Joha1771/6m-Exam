import React from "react";
import shop1 from "../../assets/Images/shop1.png";
import shop2 from "../../assets/Images/shop2.png";
import Buttons from "../Buttons/Buttons";
import arrowRight from "../../assets/Icons/right-arrow.svg";

const MobileShop = () => {
  return (
    <section className="pb-[200px]">
      <div className="container flex flex-col gap-10 items-center">
        <div className="bg-[#f7f6f6] px-[20px] py-[20px] flex flex-col gap-[10px]">
          <img src={shop1} alt="Shop 1" />
          <div className="flex flex-col justify-end items-end gap-4">
            <div className="max-w-[150px]">
              <h2 className="text-[18px] font-bold">
                Summer cactus & succulents
              </h2>
            </div>
            <div className="max-w-[292px] text-right">
              <p>
                We are an online plant shop offering a wide range of cheap and
                trendy plants
              </p>
            </div>
            <Buttons
              title="Find More"
              img={arrowRight}
              className="px-[30px] py-3"
            />
          </div>
        </div>
        <div className="bg-[#f7f6f6] px-[20px] py-[20px] flex flex-col gap-[10px]">
          <img src={shop2} alt="Shop 2" />
          <div className="flex flex-col justify-end items-end gap-4">
            <div className="max-w-[150px] flex justify-end text-right">
              <h2 className="text-[18px] font-bold">
                Styling Trends & much more
              </h2>
            </div>
            <div className="max-w-[292px] flex justify-end items-center gap-4">
              <p className="text-right">
                We are an online plant shop offering a wide range of cheap and
                trendy plants
              </p>
            </div>
            <Buttons
              title="Find More"
              img={arrowRight}
              className="px-[30px] py-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileShop;
