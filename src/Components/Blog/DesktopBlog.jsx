import React from "react";
import Blog1 from "../../assets/Images/Blog1.png";
import Blog2 from "../../assets/Images/Blog2.png";
import Blog3 from "../../assets/Images/Blog3.png";
import Blog4 from "../../assets/Images/Blog4.png";

const posts = [
  {
    id: 1,
    image: Blog1,
    subtitle: "September 12  I Read in 6 minutes",
    title: "Cactus & Succulent Care Tips",
    description:
      "Cacti are succulents are easy care plants for any home or patio.",
  },
  {
    id: 2,
    image: Blog2,
    subtitle: "September 13  I Read in 5 minutes",
    title: "Top 10 Succulents for Your Home",
    description: "Best in hanging baskets. Prefers medium to high light.",
  },
  {
    id: 3,
    image: Blog3,
    subtitle: "September 15  I Read in 3 minutes",
    title: "Cacti & Succulent Care Tips",
    description:
      "Cacti are succulents are easy care plants for any home or patio.",
  },
  {
    id: 4,
    image: Blog4,
    subtitle: "September 15  I Read in 2 minutes",
    title: "Best Houseplants Room by Room",
    description: "The benefits of houseplants are endless. In addition to...",
  },
];

const DesktopBlog = () => {
  return (
    <section className="hidden md:block">
      <div className="max-w-[1200px] mx-auto px-8 pb-20">
        <div className="text-center mb-10">
          <h2
            className="text-3xl font-bold text-gray-800 mb-2"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Our Blog Posts
          </h2>
          <p className="text-gray-500 text-sm">
            We are an online plant shop offering a wide range of cheap and
            trendy plants.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col gap-3 group cursor-pointer"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-xs text-[#46A358] font-semibold">
                {post.subtitle}
              </p>
              <h3 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-[#46A358] transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {post.description}
              </p>
              <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-[#46A358] transition-colors w-fit">
                Read More
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
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesktopBlog;
