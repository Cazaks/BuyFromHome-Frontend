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
              </Route>

              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<ProductList />} />
                <Route path="products/new" element={<CreateProduct />} />
                <Route path="products/:id/update" element={<CreateProduct />} />
                <Route path="categories" element={<CategoryList />} />
                <Route path="categories/new" element={<CreateCategory />} />
                <Route path="categories/:id/update" element={<CreateCategory />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;