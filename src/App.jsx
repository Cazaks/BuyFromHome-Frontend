import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AuthProvider from './context/AuthContext';
import CartProvider from './context/CartContext';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import CreateProduct from './pages/CreateProduct';

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
                <Route path="/admin/products/new" element={<CreateProduct />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;