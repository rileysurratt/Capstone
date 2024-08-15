import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchAndFilterBar from "./SearchAndFilterBar";
import axios from "axios";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Spinner from "react-bootstrap/Spinner";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  const addToCart = async (productId) => {
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
            productId: productId,
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
      alert("Added to cart");
    } catch (error) {
      console.log(error);
      setMessage("Error adding to cart");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/`
        );
        const result = await response.json();
        setProducts(result);
        setFilteredProducts(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/category/`
        );
        const result = await response.json();
        setCategories(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleFilter = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };

  return (
    <>
      <div className="search-bar">
        <SearchAndFilterBar
          categories={categories}
          products={products}
          onFilter={handleFilter}
        />
      </div>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div>
          {categories.map((category) => (
            <div key={category.id}>
              <h1 className="category-header">{category.name}</h1>
              <Row xs={1} md={2} className="g-4 cardGroup-container">
                {filteredProducts
                  .filter((product) => product.categoryId === category.id)
                  .map((product) => (
                    <Col key={product.id}>
                      <Card className="card-container">
                        <Card.Body className="card-body">
                          <Card.Title className="card-title">
                            {product.name}
                          </Card.Title>
                          <Card.Text className="card-details">
                            {product.description}
                          </Card.Text>
                          <Card.Text className="card-details">
                            Price: {product.price}
                          </Card.Text>
                          <Card.Text className="card-details">
                            Quantity: {product.quantity}
                          </Card.Text>
                          <Button
                            sx={{ backgroundColor: "#4d1b7b", color: "white" }}
                            className="button-color"
                            startIcon={<InfoOutlinedIcon />}
                            onClick={() => navigate(`/products/${product.id}`)}
                          >
                            Details
                          </Button>
                          <Button
                            sx={{ backgroundColor: "#4d1b7b", color: "white" }}
                            className="button-color"
                            startIcon={<AddShoppingCartIcon />}
                            onClick={() => addToCart(product.id)}
                          >
                            Add to cart
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Catalog;
