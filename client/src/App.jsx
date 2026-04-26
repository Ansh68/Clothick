import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Category from './pages/Category';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Success from './pages/Success';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Admin from './pages/Admin';
import Wishlist from './pages/Wishlist';
import NewArrivals from './pages/NewArrivals';
import Offers from './pages/Offers';
import Men from './pages/Men';
import Women from './pages/Women';
import Account from './pages/Account';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/account" element={<Account />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/success" element={<Success />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Layout>
  );
}
