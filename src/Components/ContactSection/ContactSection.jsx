import React, { useState } from "react";
import gardenCareImg from "../../assets/Icons/FooterCactus1.svg";
import plantRenovationImg from "../../assets/Icons/FooterCactus2.svg";
import wateringGardenImg from "../../assets/Icons/FooterCactus3.svg";
import logoIcon from "../../assets/Icons/logo.svg";
import locationIcon from "../../assets/Icons/location.svg";
import emailIcon from "../../assets/Icons/Message.svg";
import phoneIcon from "../../assets/Icons/Calling.svg";

const categories = [
  {
    image: gardenCareImg,
    title: "Garden Care",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants.",
  },
  {
    image: plantRenovationImg,
    title: "Plant Renovation",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants.",
  },
  {
    image: wateringGardenImg,
    title: "Watering Garden",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants.",
  },
];

const MobileContactSection = () => {
  const [email, setEmail] = useState("");

  const handleJoin = () => {
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <section className="font-montserrat bg-white ">
      <div className="px-4 py-8 shadow-primary">
        <div className="flex flex-col gap-6 mb-8">
          {categories.map((cat, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="rounded-full  flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 mb-6" />

        <div>
          <h3 className="font-bold text-sm text-gray-900 mb-3">
            Would you like to join newsletters?
          </h3>
          <div className="flex gap-2 mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email address..."
              className="flex-1 border border-gray-200 rounded px-3 py-2 text-xs text-gray-500 outline-none focus:border-green-400 transition-colors"
            />
            <button
              onClick={handleJoin}
              className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded transition-colors whitespace-nowrap"
            >
              Join
            </button>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            We usually post offers and challenges in newsletter. We're your
            online houseplant destination. We offer a wide range of houseplants
            and accessories shipped directly from our (green)house to yours!
          </p>
        </div>
      </div>

      <div className="bg-green-50 px-4 py-5">
        <div className="flex items-center gap-2 mb-4">
          <img src={logoIcon} alt="GreenShop" className="" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2">
            <img
              src={locationIcon}
              alt="location"
              className="w-4 h-4 mt-0.5 flex-shrink-0"
            />
            <span className="text-xs text-gray-600">
              70 West Buckingham Ave. Farmingdale, NY 11735
            </span>
          </div>

          <div className="flex items-center gap-2">
            <img
              src={emailIcon}
              alt="email"
              className="w-4 h-4 flex-shrink-0"
            />
            <span className="text-xs text-gray-600">contact@greenshop.com</span>
          </div>

          <div className="flex items-center gap-2">
            <img
              src={phoneIcon}
              alt="phone"
              className="w-4 h-4 flex-shrink-0"
            />
            <span className="text-xs text-gray-600">+88 01911 717 490</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileContactSection;
