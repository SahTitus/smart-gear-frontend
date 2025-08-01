import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import productService from "../services/productService";
import { LoadingComponent } from "./Loader";

const FeaturedProducts = () => {
  // const { products, loading, error, refetch } = useProducts({
  //   page: 1,
  //   limit: 9,
  //   sort: '-createdAt',
  // });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callProducts = async () => {
    try {
      const res = await productService.getProducts({
        page: 1,
        limit: 9,
        sort: "-createdAt",
      });
      setProducts(res.data?.data?.products);
    } catch (error) {
      setError(error.message || "Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callProducts();
  }, []);

  console.log(products, "🔥");
  // console.log(data, "🔥");

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-green-600">
            Featured Products
          </h2>
          <a
            href="#"
            className="text-green-600 hover:text-green-700 font-medium flex items-center"
          >
            View all products
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No featured products available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
