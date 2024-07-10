import { Route, Routes, Navigate } from "react-router-dom";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<h1>Home</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<h1>Register</h1>} />
        <Route path="/account" element={<h1>Account</h1>} />
        <Route path="/catalog" element={<h1>Catalog</h1>} />
        <Route path="/requestform" element={<h1>Request Form</h1>} />
        <Route path="/whatsnew" element={<h1>What's New</h1>} />
        <Route path="/aboutus" element={<h1>About Us</h1>} />
        <Route path="/contactus" element={<h1>Contact Us</h1>} />
        <Route path="/buildmypc" element={<h1>Build My PC</h1>} />
        <Route path="/buyprebuilt" element={<h1>Buy Prebuilt</h1>} />
        <Route path="/reviews" element={<h1>Reviews</h1>} />
        <Route path="/orderhistory" element={<h1>Order History</h1>} />
      </Routes>
    </>
  );
};

export default Router;