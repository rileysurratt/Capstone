import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const AdminCategory = () => {
  const [category, setCategory] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editCategory, setEditCategory] = useState(false);

  // Get the Logged in User/Admin
  useEffect(() => {
    const getUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

  // Get the Category Being Edited or Deleted
  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/category/${id}`
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch category");
        }

        setCategory(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
        console.error("Error fetching category:", error);
        setMessage(null);
      }
    };

    getCategory();
  }, [id]);

  // Edit Category
  const handleEdit = () => {
    setEditCategory(true);
  };

  // Save Category Changes
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: category.name,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      const updatedCategory = await response.json();
      setCategory(updatedCategory);
      setEditCategory(false);
      setMessage("Category updated successfully");
    } catch (error) {
      console.error("Error updating category:", error);
      setMessage("Failed to update category");
    }
  };

  // Delete Category
  const handleDelete = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category/${id}`, {
        method: "DELETE",
      });
      setCategory(null);
      setMessage("Category deleted successfully");
      navigate("/account");
    } catch (error) {
      console.error("Error deleting category:", error);
      setMessage("Failed to delete category");
    }
  };

  return (
    <div>
      {error ? (
        <h1>{error}</h1>
      ) : category ? (
        <Card className="cardacct">
          <CardContent>
            {editCategory ? (
              <>
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) =>
                    setCategory({ ...category, name: e.target.value })
                  }
                />
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={() => setEditCategory(false)}>Cancel</Button>
              </>
            ) : (
              <>
                <h1>{category.name}</h1>
                {isAdmin && (
                  <>
                    <Button onClick={handleEdit}>Edit</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <h1>Loading ...</h1>
      )}
    </div>
  );
};

export default AdminCategory;
