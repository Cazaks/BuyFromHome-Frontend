import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";

export default function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data.filter((p) => p.imageUrl)))
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [products]);

  if (products.length === 0) return null;

  const current = products[currentIndex];

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
        {products.map((product, index) => (
          <img
            key={product.productId}
            src={product.imageUrl}
            alt={product.productName}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-center text-white font-medium drop-shadow">
        {current.productName}
      </p>
      <div className="flex justify-center gap-1.5 mt-2">
        {products.map((_, index) => (
          <span
            key={index}
            className={`size-1.5 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}