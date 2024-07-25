import "./App.css";
import Aboutus from "./components/Router/Aboutus";
import Account from "./components/Router/Account";
import AdminCategory from "./components/Router/AdminCategory";
import AdminUser from "./components/Router/AdminUser";
import Cart from "./components/Router/Cart";
import Catalog from "./components/Router/Catalog";
import Contactus from "./components/Router/Contactus";
import Footer from "./components/Router/Footer";
import History from "./components/Router/OrderHistory";
import Register from "./components/Router/Register";
import Request from "./components/Router/Request";
import Review from "./components/Router/Review";
import Navigation from "./components/Router/Navigation";
import Login from "./components/Router/Login";
import SingleProduct from "./components/Router/SingleProduct";
import CheckoutConfirmation from "./components/Router/CheckoutConfirmation";

import { Routes, Route } from "react-router-dom";

function App() {
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/catalog", label: "Catalog" },
    { path: "/account", label: "Account" },
  ];

  const footerLinks = [
    { path: "/aboutus", label: "About Us" },
    { path: "/contactus", label: "Contact Us" },
    { path: "/requestproduct", label: "Request a Part/Product" },
    { path: "/review", label: "Reviews!" },
  ];

  return (
    <>
      <header className="container">
        <div className="row">
          <div className="col-sm-8">
            <Navigation navLinks={navLinks} />
          </div>
          <div className="col-sm-4">
            <Login />
          </div>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage footerLinks={footerLinks} />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/account" element={<Account />} />
          <Route path="/users/:id" element={<AdminUser />} />
          <Route path="/category/:id" element={<AdminCategory />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/orderhistory" element={<History />} />
          <Route path="/register" element={<Register />} />
          <Route path="/requestproduct" element={<Request />} />
          <Route path="/review" element={<Review />} />
          <Route path="/checkout" element={<CheckoutConfirmation />} />
        </Routes>
      </main>

      <Footer footerLinks={footerLinks} />
    </>
  );
}

function HomePage({ footerLinks }) {
  return (
    <div>
      <h1>Insert Something Here....</h1>
    </div>
  );
}

export default App;
