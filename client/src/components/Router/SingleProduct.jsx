// Single Product page
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

import * as React from "react";
import Card from "react-bootstrap/Card";
import Button from "@mui/material/Button";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const [guestId, setGuestId] = useState(null); // State for guestId

  const [isAdmin, setIsAdmin] = useState(false);
  const [editProduct, setEditProduct] = useState(false);

  //Retrieve the User to ensure they are an admin, this will
  //allow ADMINS to see different things vs a guest or user.
  useEffect(() => {
    const getUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAdmin(false);
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setIsAdmin(userData.role === "ADMIN");
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsAdmin(false);
      }
    };

    getUserRole();
  }, []);

  //Get the product
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
        );
        const result = await response.json();

        setProduct(result);
        setLoading(false);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
        console.log(error);
        setMessage(null);
      }
    };
    getProduct();
  }, []);

  // Retrieve guestId cookie on component mount
  useEffect(() => {
    const existingGuestId = Cookies.get("guestId");
    if (existingGuestId) {
      setGuestId(existingGuestId);
    }
  }, []);

  const handleEdit = () => {
    setEditProduct(true);
  };

  // product id and quantity in the body of post request
  const addToCart = async () => {
    console.log("Add to Cart button clicked");
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      let guestId = Cookies.get("guestId"); // For guests
      if (!token && !guestId) {
        // Check if the guestId cookie exists, otherwise create a new guestId
        const tempGuestId = `guest_${Date.now()}`;
        console.log("tempGeustId", tempGuestId);

        // Set the guestId cookie with a max age of 7 days
        Cookies.set("guestId", tempGuestId);

        // Assign the guestId to the request object
        guestId = tempGuestId;
      }
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined, // Include token if present
          },
          body: JSON.stringify({
            productId: product.id,
            quantity: parseInt(quantity),

            guestId: guestId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }
      const result = await response.json();
      console.log("Add to cart result:", result);
      setMessage("Added to cart");
    } catch (error) {
      console.log(error);
      setMessage("Error adding to cart");
    }
  };

  //Admin Patch
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: product.name,
            description: product.description,
            price: parseFloat(product.price),
            quantity: parseInt(quantity),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await response.json();
      setProduct(updatedProduct);
      setEditProduct(false);
      setMessage("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      setMessage("Failed to update product");
    }
  };

  //ADMIN DELETE
  const handleDelete = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, {
        method: "DELETE",
      });
      setProduct(null);
      setMessage("Product deleted successfully");
      navigate("/account");
    } catch (error) {
      console.error("Error Deleting Item", error);
    }
  };

  //Admin View vs Guest/User View
  return (
    <>
      <div>
        {error ? (
          <h1>{error}</h1>
        ) : product ? (
          <Card className="card-container mt-4 mb-4">
            <Card.Body className="card-body">
              {editProduct ? (
                <>
                  <input
                    className="card-title"
                    type="text"
                    value={product.name}
                    onChange={(e) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                  />
                  <input
                    className="card-details"
                    type="text"
                    value={product.description}
                    onChange={(e) =>
                      setProduct({ ...product, description: e.target.value })
                    }
                  />
                  <input
                    className="card-details"
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                  />
                  <input
                    className="card-details"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <Button
                    sx={{ backgroundColor: "#4d1b7b", color: "white" }}
                    className="button-color"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    sx={{ backgroundColor: "#4d1b7b", color: "white" }}
                    className="button-color"
                    onClick={() => setEditProduct(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <h1>{product.name}</h1>
                  <h5>Description: {product.description}</h5>
                  <h5>Price: {product.price}</h5>
                  <h5>
                    Availability:{" "}
                    {product.quantity > 0 ? "In stock" : "Out of stock"}
                  </h5>
                  <h5>Quantity: {quantity}</h5>
                  {isAdmin && (
                    <>
                      <Button
                        sx={{ backgroundColor: "#4d1b7b", color: "white" }}
                        className="button-color"
                        startIcon={<EditIcon />}
                        onClick={handleEdit}
                      >
                        Edit
                      </Button>
                      <Button
                        sx={{ backgroundColor: "#4d1b7b", color: "white" }}
                        className="button-color"
                        startIcon={<DeleteOutlineOutlinedIcon />}
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                  {!isAdmin && (
                    <>
                      <input
                        type="number"
                        label="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      ></input>
                      <Button
                        sx={{ backgroundColor: "#4d1b7b", color: "white" }}
                        className="button-color"
                        startIcon={<AddShoppingCartIcon />}
                        onClick={addToCart}
                      >
                        Add to cart
                      </Button>
                      <Button
                        sx={{ backgroundColor: "#4d1b7b", color: "white" }}
                        className="button-color"
                        onClick={() => navigate("/catalog")}
                      >
                        All products
                      </Button>
                      <Button
                        sx={{ backgroundColor: "#4d1b7b", color: "white" }}
                        className="button-color"
                        onClick={() => navigate("/cart")}
                      >
                        Checkout
                      </Button>
                    </>
                  )}
                  {message && <p style={{ color: "green" }}>{message}</p>}
                </>
              )}
            </Card.Body>
          </Card>
        ) : (
          <h1>Loading ...</h1>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
