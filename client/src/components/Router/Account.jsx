//Fetch account by user that is currently logged in.
//Order History Linked Here
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown, Button, Form } from "react-bootstrap";
import "./Account.css";

const Account = () => {
  //Retrieve Logged User
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    address: false,
    password: false,
  });
  const [editValues, setEditValues] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  //Create Category
  const [categoryName, setCategoryName] = useState("");
  //Create Product
  const [productName, setproductName] = useState("");
  const [productDesc, setproductDesc] = useState("");
  const [productPrice, setproductPrice] = useState("");
  const [productQty, setproductQty] = useState("");
  const [catId, setCatId] = useState("");
  //Admin to get users, products, categories
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  //Get Users
  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users`
        );
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    getUsers();
  }, []);

  //Get Products
  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/products`
        );
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  //Get Categories
  useEffect(() => {
    async function getCategory() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/category`
        );
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    getCategory();
  }, []);

  //Create Category
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: categoryName }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      const data = await response.json();
      setMessage(data.message);
      setCategoryName("");
      setError("");
    } catch (error) {
      console.error("Error adding category:", error);
      setError("Failed to add category. Please try again.");
      setMessage("");
    }
  };

  //Create a Product
  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: productName,
            description: productDesc,
            price: parseFloat(productPrice),
            quantity: parseInt(productQty),
            categoryId: parseInt(catId),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const data = await response.json();
      setMessage(data.message);
      setproductName("");
      setproductDesc("");
      setproductPrice("");
      setproductQty("");
      setCatId("");
      setError("");
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Failed to create product. Please try again.");
      setMessage("");
    }
  };

  //Get the user that is logged on
  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/me`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching user data");
        }
        const userInfo = await response.json();
        console.log("Fetched user info:", userInfo); // Debugging line
        setUser(userInfo);
        setEditValues({
          name: userInfo.name || "",
          email: userInfo.email || "",
          address: userInfo.address || "",
          password: "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const handleEditSubmit = async (field) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/me`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            [field]: editValues[field] || undefined, // Only include if value is set
            password: field === "password" ? editValues.password : undefined,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user information");
      }

      const data = await response.json();
      setMessage(data.message);
      setError("");
      setEditMode((prev) => ({ ...prev, [field]: false }));
    } catch (error) {
      console.error("Error updating user information:", error);
      setError("Failed to update user information. Please try again.");
      setMessage("");
    }
  };

  // Handle input change
  const handleInputChange = (e, field) => {
    setEditValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Toggle edit mode
  const toggleEditMode = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div>
        <h1>Please login to proceed to account information...</h1>
      </div>
    );
  }

  const isAdmin = user.role === "ADMIN";
  //Admin First
  //User has limited view
  return (
    <>
      {isAdmin ? (
        <div>
          <h1 className="create-this">Admin User</h1>
          <Dropdown>
            <Dropdown.Toggle className="dropdown-color" id="dropdown-basic">
              Users
            </Dropdown.Toggle>
            <Dropdown.Menu
              className="dropdown-menu"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              {users.map((user) => (
                <Dropdown.Item key={user.id}>
                  <div>
                    <strong>Email:</strong> {user.email}
                  </div>
                  <div>
                    <strong>Name:</strong> {user.name}
                  </div>
                  <div>
                    <strong>Address:</strong> {user.address}
                  </div>
                  <div>
                    <strong>Role:</strong> {user.role}
                  </div>
                  <div>
                    <Button
                      className="second-button"
                      onClick={() => navigate(`/users/${user.id}`)}
                    >
                      User Page
                    </Button>
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle className="dropdown-color" id="dropdown-basic">
              Products
            </Dropdown.Toggle>
            <Dropdown.Menu
              className="dropdown-menu"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              {products.map((products) => (
                <Dropdown.Item key={products.id}>
                  <div>
                    <strong>Name:</strong> {products.name}
                  </div>
                  <div>
                    <strong>Desc:</strong> {products.description}
                  </div>
                  <div>
                    <strong>Price:</strong> {products.price}
                  </div>
                  <div>
                    <strong>Quantity:</strong> {products.quantity}
                  </div>
                  <div>
                    <strong>Category ID:</strong> {products.categoryId}
                  </div>
                  <div>
                    <Button
                      className="second-button"
                      onClick={() => navigate(`/products/${products.id}}`)}
                    >
                      Product Page
                    </Button>
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle className="dropdown-color" id="dropdown-basic">
              Categories
            </Dropdown.Toggle>
            <Dropdown.Menu
              className="dropdown-menu"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {categories.map((categories) => (
                <Dropdown.Item key={categories.id}>
                  <div>
                    <strong>Category Name:</strong> {categories.name}
                  </div>
                  <div>
                    <strong>Category ID:</strong> {categories.id}
                  </div>
                  <div>
                    <Button
                      className="second-button"
                      onClick={() => navigate(`/category/${categories.id}`)}
                    >
                      Category Page
                    </Button>
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <h3>
            <b className="create-this">Create a Category</b>
          </h3>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                className="form-color"
                placeholder="Name of Category"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
            <button className="button-color" type="submit">
              Create Category
            </button>
          </form>
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <br />
          <h3>
            <b className="create-this">Add a Product</b>
          </h3>
          <form onSubmit={createProduct}>
            <div>
              <input
                className="form-color"
                type="text"
                placeholder="Name of Product"
                value={productName}
                onChange={(e) => setproductName(e.target.value)}
                required
              />
              <br></br>
              <input
                className="form-color"
                type="text"
                placeholder="Description of Product"
                value={productDesc}
                onChange={(e) => setproductDesc(e.target.value)}
                required
              />
              <br></br>
              <input
                className="form-color"
                type="text"
                placeholder="Price of Product"
                value={productPrice}
                onChange={(e) => setproductPrice(e.target.value)}
                required
              />
              <br></br>
              <input
                className="form-color"
                type="text"
                placeholder="Price of Product"
                value={productQty}
                onChange={(e) => setproductQty(e.target.value)}
                required
              />
              <br></br>
              <input
                className="form-color"
                type="text"
                placeholder="Category ID of Product"
                value={catId}
                onChange={(e) => setCatId(e.target.value)}
                required
              />
            </div>
            <button className="button-color" type="submit">
              Add the Product
            </button>
          </form>
        </div>
      ) : (
        <>
          <h1>Hello, {user.user.name}!</h1>
          <h2>Name: {user.user.name}</h2>
          <h2>Email: {user.user.email}</h2>
          <h2>Address: {user.user.address}</h2>
          <Button
            className="second-button"
            onClick={() => navigate(`/orderhistory`)}
          >
            Order History
          </Button>
          <Button
            className="second-button"
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            {isFormVisible ? "Cancel" : "Edit Information"}
          </Button>
          {isFormVisible && (
            <>
              <Form>
                <Form.Group controlId="formBasicName">
                  {editMode.name ? (
                    <div>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={editValues.name}
                        onChange={(e) => handleInputChange(e, "name")}
                      />
                      <Button
                        className="second-button"
                        onClick={() => handleEditSubmit("name")}
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="second-button"
                      onClick={() => toggleEditMode("name")}
                    >
                      {user.name || "Edit Name"}
                    </Button>
                  )}
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  {editMode.email ? (
                    <div>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={editValues.email}
                        onChange={(e) => handleInputChange(e, "email")}
                      />
                      <Button
                        className="second-button"
                        onClick={() => handleEditSubmit("email")}
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="second-button"
                      onClick={() => toggleEditMode("email")}
                    >
                      {user.email || "Edit Email"}
                    </Button>
                  )}
                </Form.Group>
                <Form.Group controlId="formBasicAddress">
                  {editMode.address ? (
                    <div>
                      <Form.Control
                        type="text"
                        placeholder="Enter your address"
                        value={editValues.address}
                        onChange={(e) => handleInputChange(e, "address")}
                      />
                      <Button
                        className="second-button"
                        onClick={() => handleEditSubmit("address")}
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="second-button"
                      onClick={() => toggleEditMode("address")}
                    >
                      {user.address || "Edit Address"}
                    </Button>
                  )}
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  {editMode.password ? (
                    <div>
                      <Form.Control
                        type="password"
                        placeholder="Enter a new password (leave blank if you don't want to change it)"
                        value={editValues.password}
                        onChange={(e) => handleInputChange(e, "password")}
                      />
                      <Button
                        className="second-button"
                        onClick={() => handleEditSubmit("password")}
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="second-button"
                      onClick={() => toggleEditMode("password")}
                    >
                      {editValues.password
                        ? "Change password"
                        : "Click to change password"}
                    </Button>
                  )}
                </Form.Group>
              </Form>
              {message && <p style={{ color: "green" }}>{message}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Account;
