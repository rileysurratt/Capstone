import "./App.css";
import emailjs from '@emailjs/browser';
import Aboutus from "./components/Router/Aboutus";
import Account from "./components/Router/Account";
import AdminCategory from "./components/Router/AdminCategory";
import AdminUser from "./components/Router/AdminUser";
import Cart from "./components/Router/Cart";
import Catalog from "./components/Router/Catalog";
import Contactus from "./components/Router/Contactus";
import Footer from "./components/Router/Footer";
import OrderHistory from "./components/Router/OrderHistory";
import Register from "./components/Router/Register";
import Request from "./components/Router/Request";
import Review from "./components/Router/Review";
import Navigation from "./components/Router/Navigation";
import Login from "./components/Router/Login";
import SingleProduct from "./components/Router/SingleProduct";
import CheckoutConfirmation from "./components/Router/CheckoutConfirmation";
import OrderSuccess from "./components/Router/OrderSuccess";
import CheckoutForm from "./components/Router/CheckoutForm";
import Return from "./components/Router/Return";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";

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
    <div className="full-page">
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
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/requestproduct" element={<Request />} /> */}
          <Route path="/review" element={<Review />} />
          <Route path="/checkout" element={<CheckoutConfirmation />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/payment" element={<CheckoutForm />} />
          {/* <Route path="/return" element={<Return />} />{" "} */}
        </Routes>
      </main>

      <Footer footerLinks={footerLinks} />
    </div>
  );
}

function HomePage({ footerLinks }) {
  return (
    <div className="page-container">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default App;
