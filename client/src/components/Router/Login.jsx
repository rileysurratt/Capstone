//Login Button Functionality and Register Route
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="loginform">
      <form className="userForm">
        <label>Email:</label><br />
        <input
        placeholder="EMAIL"
        name="email"
        type="email"
        required
        className="userForm"
        />
        <br />
        <label>Password:</label>
        <input
        placeholder="PASSWORD"
        name="password"
        type="password"
        required
        className="userForm"
        />
      </form>
      <Button variant="secondary" className="ml-2">
        Login
      </Button>
      <Button
        variant="secondary"
        className="ml-2"
        onClick={() => navigate(`/register`)}
      >
        Register New Account
      </Button>
    </div>
  );
}

export default Login;
