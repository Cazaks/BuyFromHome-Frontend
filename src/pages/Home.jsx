import { useEffect, useState } from "react";
import Container from "../components/Container";
import { fetchProducts } from "../api/products";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="size-[500px] rounded-full border border-gray-100 dark:border-gray-800" />
          <div className="absolute size-[350px] rounded-full border border-gray-100 dark:border-gray-800" />
          <div className="absolute size-[200px] rounded-full border border-gray-100 dark:border-gray-800" />
        </div>

        <Container as="section" className="relative z-10 text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Welcome to BuyFromHome Stores</h1>
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">
            Discover the best products at unbeatable prices. Shop now and enjoy
            exclusive deals!
          </p>
        </Container>
      </div>

      <Container as="section" className="text-center py-20 pt-0">
        <h2 className="text-3xl font-bold mb-4">Our Products</h2>
        <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">
          Browse what we currently have available.
        </p>

        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.productId}
                className="text-left border border-gray-200 dark:border-gray-800 rounded-lg p-4"
              >

                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="h-48 w-full object-cover"
                  />
                )}
                <span className="inline-block text-xs font-medium text-blue-600 mb-1">
                  {product.productCategoryName}
                </span>
                <h3 className="text-lg font-semibold">{product.productName}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {product.productDescription}
                </p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}