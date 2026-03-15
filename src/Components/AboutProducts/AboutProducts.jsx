import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../Config/axios.config";

const AboutProducts = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.product);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500">Product not found.</p>
        <Link to="/" className="mt-4 text-[#46A358] underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-1/2">
            <img
              src={product.pictures[0]}
              alt={product.name}
              className="w-full rounded-xl object-cover"
            />
          </div>
          <div className="lg:w-1/2">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <p className="text-green-600 font-semibold text-xl mb-4">
              ${product.price?.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="flex flex-col gap-3">
              <button className="w-full rounded-lg bg-[#46A358] py-3 text-white font-semibold hover:bg-[#3a9b4a]">
                Add to cart
              </button>
              <Link
                to="/"
                className="text-center text-sm text-gray-500 underline"
              >
                Back to shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProducts;
