import Navbar from './components/Navbar';
import Home from './pages/Home';
import CartProvider from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <div>
        <Navbar />
        <Home />
      </div>
    </CartProvider>
  );
}

export default App;