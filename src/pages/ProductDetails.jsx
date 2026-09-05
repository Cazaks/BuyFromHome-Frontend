import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import { fetchProductById } from "../api/products";
import { fetchProductOptionsByProduct } from "../api/productOptions";
import { fetchSellingMeasurementsByOption } from "../api/sellingMeasurements";
import { measurementUnitLabels } from "../components/measurementUnitLabels";
import { useCart } from "../context/useCart";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [measurements, setMeasurements] = useState([]);
  const [selectedMeasurementId, setSelectedMeasurementId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchProductById(id), fetchProductOptionsByProduct(id)])
      .then(([productData, optionsData]) => {
        setProduct(productData);
        setOptions(optionsData.filter((o) => o.enabled));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!selectedOptionId) {
      setMeasurements([]);
      setSelectedMeasurementId("");
      return;
    }
    fetchSellingMeasurementsByOption(selectedOptionId)
      .then((data) => setMeasurements(data.filter((m) => m.enabled && m.quantityInStock > 0)))
      .catch((err) => setError(err.message));
  }, [selectedOptionId]);

  const selectedMeasurement = measurements.find(
    (m) => String(m.sellingMeasurementId) === selectedMeasurementId
  );

  const handleAddToCart = () => {
    if (!selectedMeasurement) return;

    addToCart({
      id: selectedMeasurement.sellingMeasurementId,
      name: `${product.productName} (${selectedMeasurement.productVariety}${
        selectedMeasurement.productSpecification ? ", " + selectedMeasurement.productSpecification : ""
      }) - ${measurementUnitLabels[selectedMeasurement.measurementUnit]}`,
      price: selectedMeasurement.sellingPrice,
      discount: 0,
      image: product.imageUrl,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <Container className="py-20 text-center">Loading...</Container>;
  if (error) return <Container className="py-20 text-center text-red-500">{error}</Container>;
  if (!product) return null;

  return (
    <Container as="section" className="py-20 text-gray-900 dark:text-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="w-full h-80 object-cover rounded-lg"
        />

        <div>
          <span className="text-xs font-medium text-primary-500">{product.productCategoryName}</span>
          <h1 className="text-3xl font-bold mt-1 mb-3">{product.productName}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{product.productDescription}</p>

          {options.length === 0 ? (
            <p className="text-gray-500">No variants available for this product yet.</p>
          ) : (
            <>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Choose an option</label>
                <select
                  value={selectedOptionId}
                  onChange={(e) => {
                    setSelectedOptionId(e.target.value);
                    setSelectedMeasurementId("");
                  }}
                  className="block w-full px-4 py-2 h-12 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-900"
                >
                  <option value="">Select an option</option>
                  {options.map((opt) => (
                    <option key={opt.productOptionId} value={opt.productOptionId}>
                      {opt.productVariety}
                      {opt.productSpecification ? ` - ${opt.productSpecification}` : ""}
                    </option>
                  ))}
                </select>
              </div>

              {selectedOptionId && (
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium">Choose a size / measurement</label>
                  {measurements.length === 0 ? (
                    <p className="text-gray-500 text-sm">No measurements available for this option.</p>
                  ) : (
                    <select
                      value={selectedMeasurementId}
                      onChange={(e) => setSelectedMeasurementId(e.target.value)}
                      className="block w-full px-4 py-2 h-12 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-900"
                    >
                      <option value="">Select a measurement</option>
                      {measurements.map((m) => (
                        <option key={m.sellingMeasurementId} value={m.sellingMeasurementId}>
                          {measurementUnitLabels[m.measurementUnit]} - ₦{m.sellingPrice}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}

              {selectedMeasurement && (
                <>
                  <p className="text-2xl font-bold mb-4">₦{selectedMeasurement.sellingPrice}</p>

                  <div className="flex items-center gap-4 mb-6">
                    <label className="text-sm font-medium">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      max={selectedMeasurement.quantityInStock}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-20 px-3 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-900"
                    />
                    <span className="text-sm text-gray-500">
                      {selectedMeasurement.quantityInStock} in stock
                    </span>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="bg-primary-500 text-white px-6 py-3 rounded hover:bg-primary-600 transition-colors duration-200 cursor-pointer"
                  >
                    {added ? "Added!" : "Add to Cart"}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
}