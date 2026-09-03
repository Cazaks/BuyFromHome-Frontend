import Container from "../components/Container";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../data/products";

export default function Home() {
  const products = getProducts();

  return (
    <>
      <div className="relative overflow-hidden">
        {/* Subtle radial background rings */}
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
        <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
        <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">
          Check out our top picks and find your next favorite item.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </>
  );
}