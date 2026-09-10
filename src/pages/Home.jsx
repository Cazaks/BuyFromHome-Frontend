import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { fetchProducts } from "../api/products";
import { fetchCategories } from "../api/categories";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const productsByCategory = categories
    .filter((cat) => cat.enabled)
    .map((cat) => ({
      category: cat,
      products: products.filter((p) => p.productCategoryId === cat.id),
    }))
    .filter((group) => group.products.length > 0);

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

      <Container as="section" className="py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Our Products</h2>
        <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-400">
          Browse what we currently have available.
        </p>

        {loading && <p className="text-center">Loading products...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {!loading && !error && productsByCategory.length === 0 && (
          <p className="text-center text-gray-500">No products available yet.</p>
        )}

        {!loading &&
          !error &&
          productsByCategory.map(({ category, products: categoryProducts }) => (
            <div key={category.id} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-gray-800 pb-3">
                {category.categoryName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categoryProducts.map((product) => (
                  <Link
                    key={product.productId}
                    to={`/products/${product.productId}`}
                    className="block text-left border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    {product.imageUrl && (
                      <img
                        src={product.imageUrl}
                        alt={product.productName}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h4 className="text-lg font-semibold">{product.productName}</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {product.productDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </Container>
    </>
  );
}