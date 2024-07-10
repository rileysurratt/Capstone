import { Route, Routes, Navigate } from "react-router-dom";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/" element={<h1>Login</h1>} />
        <Route path="/" element={<h1>Register</h1>} />
        <Route path="/" element={<h1>Account</h1>} />
        <Route path="/" element={<h1>Catalog</h1>} />
        <Route path="/" element={<h1>Request Form</h1>} />
        <Route path="/" element={<h1>What's New</h1>} />
        <Route path="/" element={<h1>About Us</h1>} />
        <Route path="/" element={<h1>Contact Us</h1>} />
        <Route path="/" element={<h1>Build My PC</h1>} />
        <Route path="/" element={<h1>Buy Prebuilt</h1>} />
        <Route path="/" element={<h1>Reviews</h1>} />
        <Route path="/" element={<h1>Order History</h1>} />
      </Routes>
    </>
  );
};

export default Router;