import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Config/axios.config";
import cart from "../../Assets/Icons/MobileCart.svg";

const SIZES = ["S", "M", "L", "XL"];

const AboutProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [isWished, setIsWished] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    const getReviews = async () => {
      setReviewsLoading(true);
      try {
        const res = await api.get("/reviews");
        const all = res.data?.reviews ?? [];
        setReviews(
          all.filter(
            (r) =>
              r.productId && (r.productId._id === id || r.productId === id),
          ),
        );
      } catch (e) {
        console.log(e);
      } finally {
        setReviewsLoading(false);
      }
    };
    getReviews();
  }, [id]);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1)
    : null;

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#f4f6f3] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#46A358] border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen bg-[#f4f6f3] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 font-medium">Product not found</p>
        <button
          onClick={() => navigate(-1)}
          className="text-[#46A358] underline text-sm"
        >
          Go back
        </button>
      </div>
    );

  const images = product.pictures || [];
  const mainImage = images[0] || null;
  const totalPrice = ((product.price || 0) * quantity).toFixed(2);

  const ReviewsList = ({ cols = 1 }) =>
    reviewsLoading ? (
      <p className="text-sm text-gray-400">Loading reviews...</p>
    ) : reviews.length === 0 ? (
      <p className="text-sm text-gray-400 py-4 text-center">No reviews yet.</p>
    ) : (
      <div
        className={
          cols === 2 ? "grid grid-cols-2 gap-4" : "flex flex-col gap-3"
        }
      >
        {reviews.map((r) => (
          <div key={r._id} className="flex gap-3 bg-[#fafafa] rounded-2xl p-4">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 bg-[#46A358]">
              {r.reviewerName?.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-[#1a1a1a]">
                  {r.reviewerName}
                </span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg
                      key={s}
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill={s <= r.stars ? "#FCBA03" : "#e5e7eb"}
                      stroke={s <= r.stars ? "#FCBA03" : "#e5e7eb"}
                      strokeWidth="1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500">{r.comment}</p>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* ════ MOBILE ════ */}
      <div className="md:hidden flex justify-center">
        <div className="w-full max-w-[430px] bg-white min-h-screen flex flex-col relative overflow-hidden">
          <div
            className="relative bg-[#f8f8f8] w-full"
            style={{ minHeight: 320 }}
          >
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 z-10 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center active:scale-95"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#222"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => setIsWished(!isWished)}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center active:scale-95"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={isWished ? "#46A358" : "none"}
                stroke={isWished ? "#46A358" : "#888"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            <div
              className="flex items-center justify-center w-full"
              style={{ height: 300 }}
            >
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product.name}
                  className="object-contain w-full h-full p-6"
                  style={{ maxHeight: 300 }}
                />
              ) : (
                <div className="w-40 h-40 rounded-2xl bg-gray-100" />
              )}
            </div>
          </div>

          <div className="flex-1 bg-white rounded-t-3xl -mt-4 relative z-10 px-5 pt-6 pb-28 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-2">
              <h2
                className="text-[22px] font-bold text-[#1a1a1a] leading-tight"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {product.name}
              </h2>
              <div className="flex items-center gap-1.5 bg-white border border-gray-100 rounded-full px-3 py-1 shadow-sm shrink-0">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="#FCBA03"
                  stroke="#FCBA03"
                  strokeWidth="1"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="text-sm font-semibold">
                  {avgRating ?? "4.8"}
                </span>
                <span className="text-sm text-gray-400">
                  ({reviews.length || 19})
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              {product.description}
            </p>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold">Size:</span>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-9 h-9 rounded-full text-sm font-medium border transition-all ${selectedSize === s ? "bg-[#46A358] text-white border-[#46A358]" : "bg-white text-gray-600 border-gray-200 hover:border-[#46A358]"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5 text-sm">
              <p>
                <span className="text-gray-400">SKU: </span>
                <span className="text-gray-600">{product._id}</span>
              </p>
              <p>
                <span className="text-gray-400">Categories: </span>
                <span className="text-gray-600 font-medium">
                  {product.category ?? "Potter Plants"}
                </span>
              </p>
              <p>
                <span className="text-gray-400">Tags: </span>
                <span className="text-gray-600">Home, Garden, Plants</span>
              </p>
              {product.discount && (
                <p>
                  <span className="text-gray-400">Discount: </span>
                  <span className="text-red-500 font-medium">
                    {product.discount}% off
                  </span>
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3 mt-2">
              <h3 className="text-base font-bold text-[#1a1a1a]">
                Reviews{" "}
                {reviews.length > 0 && (
                  <span className="text-sm font-normal text-gray-400">
                    ({reviews.length})
                  </span>
                )}
              </h3>
              <ReviewsList cols={1} />
            </div>
          </div>

          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 px-5 py-4 z-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 font-medium">Qty</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#46A358] hover:text-[#46A358]"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <span className="text-base font-semibold w-5 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#46A358] hover:text-[#46A358]"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
              </div>
              <span className="text-xl font-bold text-[#46A358]">
                ${totalPrice}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className={`w-[150px] h-12 rounded-full font-semibold text-base transition-all ${addedToCart ? "bg-[#2d8a46] text-white scale-95" : "bg-[#46A358] text-white hover:bg-[#3d9450] active:scale-95"}`}
              >
                {addedToCart ? "Added ✓" : "Buy Now"}
              </button>
              <button className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#46A358]">
                <img src={cart} alt="cart" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ════ DESKTOP ════ */}
      <div className="hidden md:block pt-[70px]">
        <div className="max-w-[1200px] mx-auto px-8 py-10">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#46A358] transition-colors mb-8 group"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:-translate-x-1 transition-transform"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back to products
          </button>

          {/* Main grid */}
          <div className="grid grid-cols-2 gap-16 items-start">
            {/* Image */}
            <div className="flex flex-col gap-4 sticky top-[90px]">
              <div className="bg-[#f8f8f8] rounded-2xl flex items-center justify-center aspect-square overflow-hidden">
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-full object-contain p-12"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-200 rounded-xl" />
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="w-20 h-20 rounded-xl bg-[#f8f8f8] overflow-hidden border-2 border-transparent hover:border-[#46A358] transition-colors cursor-pointer"
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between gap-4">
                <h1
                  className="text-3xl font-bold text-[#1a1a1a] leading-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {product.name}
                </h1>
                <button
                  onClick={() => setIsWished(!isWished)}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#46A358] transition-colors shrink-0"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={isWished ? "#46A358" : "none"}
                    stroke={isWished ? "#46A358" : "#888"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg
                      key={s}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={
                        s <= Math.round(Number(avgRating ?? 5))
                          ? "#FCBA03"
                          : "#e5e7eb"
                      }
                      stroke={
                        s <= Math.round(Number(avgRating ?? 5))
                          ? "#FCBA03"
                          : "#e5e7eb"
                      }
                      strokeWidth="1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {avgRating ?? "4.8"}
                </span>
                <span className="text-sm text-gray-400">
                  ({reviews.length || 19} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-[#46A358]">
                  ${totalPrice}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                    <span className="bg-[#f0faf2] text-[#46A358] text-xs font-bold px-2.5 py-1 rounded-full">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-500 leading-relaxed text-sm border-t border-gray-100 pt-5">
                {product.description ||
                  "The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. Perfect for home and office spaces, bringing a touch of nature indoors."}
              </p>

              {/* Size */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-[#1a1a1a]">
                  Size:
                </span>
                <div className="flex gap-3">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-10 h-10 rounded-full text-sm font-semibold border-2 transition-all ${selectedSize === s ? "bg-[#46A358] text-white border-[#46A358] shadow-md" : "bg-white text-gray-600 border-gray-200 hover:border-[#46A358]"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Qty + Buy */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2.5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-[#46A358]"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <span className="text-base font-semibold w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-[#46A358]"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 h-12 rounded-xl font-semibold text-base transition-all ${addedToCart ? "bg-[#2d8a46] text-white scale-95" : "bg-[#46A358] text-white hover:bg-[#3d9450] active:scale-95"}`}
                >
                  {addedToCart ? "Added to Cart ✓" : "Buy Now"}
                </button>
                <button className="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-[#46A358] transition-colors">
                  <img src={cart} alt="cart" className="w-5 h-5" />
                </button>
              </div>

              {/* Meta */}
              <div className="flex flex-col gap-2 text-sm border-t border-gray-100 pt-5">
                <p>
                  <span className="text-gray-400 w-24 inline-block">SKU:</span>
                  <span className="text-gray-600">
                    {product._id?.slice(-10).toUpperCase()}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400 w-24 inline-block">
                    Categories:
                  </span>
                  <span className="text-[#46A358] font-semibold">
                    {product.category ?? "House Plants"}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400 w-24 inline-block">Tags:</span>
                  <span className="text-gray-600">Home, Garden, Plants</span>
                </p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-16 border-t border-gray-100 pt-10">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">
              Reviews{" "}
              {reviews.length > 0 && (
                <span className="text-base font-normal text-gray-400 ml-2">
                  ({reviews.length})
                </span>
              )}
            </h2>
            <ReviewsList cols={2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProducts;
