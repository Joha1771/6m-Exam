import React, { useState } from "react";
import Blog1 from "../../assets/Images/Blog1.png";
import Blog2 from "../../assets/Images/Blog2.png";
import Blog3 from "../../assets/Images/Blog3.png";
import Blog4 from "../../assets/Images/Blog4.png";
import BlogBtns from "../Buttons/BlogBtns/BlogBtns";

const posts = [
  {
    id: 1,
    image: Blog1,
    subtitle: "September 12  I Read in 6 minutes",
    title: "Cactus & Succulent Care Tips",
    description:
      "Cacti are succulents are easy care plants for any home or patio. ",
  },
  {
    id: 2,
    image: Blog2,
    subtitle: "Top 10 Succulents for Your Home",
    title: "Cactus & Succulent Care Tips",
    description: "Best in hanging baskets. Prefers medium to high light. ",
  },
  {
    id: 3,
    image: Blog3,
    subtitle: "September 15  I Read in 3 minutes",
    title: "Cacti & Succulent Care Tips",
    description:
      "Cacti are succulents are easy care plants for any home or patio. ",
  },
  {
    id: 4,
    image: Blog4,
    subtitle: "September 15  I Read in 2 minutes",
    title: "Best Houseplants  Room by Room",
    description: "The benefits of houseplants are endless. In addition to..",
  },
];

const MobileBlog = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <section className="pb-[100px]">
      <div className="container">
        <div>
          {posts.map((post) => (
            <div key={post.id} className="flex flex-col gap-2 mb-10">
              <img
                src={post.image}
                alt={post.title}
                className="w-full rounded-xl"
              />
              <p className="text-sm text-[#46A358]">{post.subtitle}</p>
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-gray-700">{post.description}</p>
              <BlogBtns
                className="flex items-center"
                onClick={() => setIsActive(!isActive)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileBlog;
