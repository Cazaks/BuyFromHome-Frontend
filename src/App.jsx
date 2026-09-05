import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AuthProvider from './context/AuthContext';
import CartProvider from './context/CartContext';
import MainLayout from './layout/MainLayout';
import AdminLayout from './layout/AdminLayout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import ProductList from './pages/ProductList';
import CreateProduct from './pages/CreateProduct';
import CategoryList from './pages/CategoryList';
import CreateCategory from './pages/CreateCategory';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProductDetails from './pages/ProductDetails';
import ProductOptionList from './pages/ProductOptionList';
import CreateProductOption from './pages/CreateProductOption';
import SellingMeasurementList from './pages/SellingMeasurementList';
import CreateSellingMeasurement from './pages/CreateSellingMeasurement';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/products/:id" element={<ProductDetails />} />
              </Route>

              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<ProductList />} />
                <Route path="products/new" element={<CreateProduct />} />
                <Route path="products/:id/update" element={<CreateProduct />} />
                <Route path="categories" element={<CategoryList />} />
                <Route path="categories/new" element={<CreateCategory />} />
                <Route path="categories/:id/update" element={<CreateCategory />} />
                <Route path="product-options" element={<ProductOptionList />} />
                <Route path="product-options/new" element={<CreateProductOption />} />
                <Route path="product-options/:id/update" element={<CreateProductOption />} />
                <Route path="selling-measurements" element={<SellingMeasurementList />} />
                <Route path="selling-measurements/new" element={<CreateSellingMeasurement />} />
                <Route path="selling-measurements/:id/update" element={<CreateSellingMeasurement />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;