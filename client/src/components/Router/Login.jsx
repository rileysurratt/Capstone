//Login Button Functionality and Register Route
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [loggedOn, setLoggedOn] = useState(false);
  const [defaultState, setdefaultState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedOn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: defaultState.email,
            password: defaultState.password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Login has failed.");
      }

      const data = await response.json();

      if (data.token) {
        setLoggedOn(true);
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        throw new Error("Login has failed.");
      }
    } catch (error) {
      setError(error);
      setLoggedOn(false);
      localStorage.removeItem("token");
    }
  };
  //The function to handle input changes.
  const handleChange = (e) => {
    setdefaultState({
      ...defaultState,
      [e.target.name]: e.target.value,
    });
  };
  //The function to LOGOUT (remove the local storage)
  const handleLogout = () => {
    setLoggedOn(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="loginform">
      {!loggedOn ? (
        <form onSubmit={handleSubmit} className="form-group custom-form">
          <label htmlFor="email">Email</label>
          <input
          placeholder="email"
            name="email"
            type="email"
            required
            className="form-control"
            value={defaultState.email}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
          placeholder="password"
            name="password"
            type="password"
            required
            className="form-control"
            value={defaultState.password}
            onChange={handleChange}
          />
          <br />
          <Button
            variant="secondary"
            className="ml-2"
            onClick={() => navigate(`/cart`)}
          >
            My Cart
          </Button>
          <Button
            type="submit"
            variant="secondary"
            color="primary"
            className="w-full max-w-xs"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <Button
            variant="secondary"
            className="ml-2"
            onClick={() => navigate(`/register`)}
          >
            Register New Account
          </Button>
        </form>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <h3>Welcome In!</h3>
          <Button variant="secondary" onClick={() => navigate("/cart")}>
            My Cart
          </Button>
          <Button variant="secondary" onClick={() => navigate("/account")}>
            My Account
          </Button>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
      {error && <h2>{error.message}</h2>}
    </div>
  );
}

export default Login;
