//Fetch account by user that is currently logged in.
//Order History Linked Here
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown, Button } from "react-bootstrap";

const Account = () => {
  //Retrieve Logged User
  const [user, setUser] = useState(null);
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
        const response = await fetch("http://localhost:3000/api/users");
        const data = await response.json();
        setUsers(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getUsers();
  }, []);

  //Get Products
  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        setProducts(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  //Get Categories
  useEffect(() => {
    async function getCategory() {
      try {
        const response = await fetch("http://localhost:3000/api/category");
        const data = await response.json();
        setCategories(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
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
      const response = await fetch("http://localhost:3000/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: categoryName }),
      });

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
      const response = await fetch("http://localhost:3000/api/products", {
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
      });
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
        const response = await fetch(`http://localhost:3000/api/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error");
        }
        const userInfo = await response.json();
        setUser(userInfo);
      } catch (error) {
        console.error("There was an error with fetching the request", error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [id]);

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
          <h1>Admin User</h1>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">Users</Dropdown.Toggle>
            <Dropdown.Menu>
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
                    <Button variant="primary" onClick={() => navigate(`/users/${user.id}`)}>User Page</Button>
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Products
            </Dropdown.Toggle>
            <Dropdown.Menu>
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
                    <Button variant="primary"
                    onClick={() => navigate(`/products/${products.id}}`)}>Product Page</Button>
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
              Categories
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map((categories) => (
                <Dropdown.Item key={categories.id}>
                  <div>
                    <strong>Category Name:</strong> {categories.name}
                  </div>
                  <div>
                    <strong>Category ID:</strong> {categories.id}
                  </div>
                  <div>
                    <Button variant="primary" onClick={() => navigate(`/category/${categories.id}`)}>Category Page</Button>
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <h3>
            <b>Create a Category</b>
          </h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                placeholder="Name of Category"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
            <button type="submit">Create Category</button>
          </form>
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <br />
          <h3>
            <b>Add a Product</b>
          </h3>
          <form onSubmit={createProduct}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                placeholder="Name of Product"
                value={productName}
                onChange={(e) => setproductName(e.target.value)}
                required
              />
              <label>Description:</label>
              <input
                type="text"
                placeholder="Description of Product"
                value={productDesc}
                onChange={(e) => setproductDesc(e.target.value)}
                required
              />
              <label>Price:</label>
              <input
                type="text"
                placeholder="Price of Product"
                value={productPrice}
                onChange={(e) => setproductPrice(e.target.value)}
                required
              />
              <label>Quantity:</label>
              <input
                type="text"
                placeholder="Price of Product"
                value={productQty}
                onChange={(e) => setproductQty(e.target.value)}
                required
              />
              <label>Category ID:</label>
              <input
                type="text"
                placeholder="Category of Product"
                value={catId}
                onChange={(e) => setCatId(e.target.value)}
                required
              />
            </div>
            <button type="submit">Add the Product</button>
          </form>
        </div>
      ) : (
        <>
          <h1>Hello, {users.name}!</h1>
          <h2>User Dashboard</h2>
          <Button
            type="submit"
            className="userData"
            variant="secondary"
            color="primary"
            style={{ backgroundColor: "white", color: "black" }}
            onClick={() => navigate(`/orderhistory`)}
          >
            Order History
          </Button>
        </>
      )}
    </>
  );
};

export default Account;