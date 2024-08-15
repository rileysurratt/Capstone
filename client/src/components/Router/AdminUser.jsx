import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const AdminUser = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editUser, setEditUser] = useState(false);

  //Get the Logged in User/Admin
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

  //Get the User Being Edited or Deleted
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`);
        const result = await response.json();

        setUser(result);
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
    getUser();
  }, [id]);

  //Edit User
  const handleEdit = () => {
    setEditUser(true);
  };

  //Save for Editing the User
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          address: user.address,
          role: user.role,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updateUser = await response.json();
      setUser(updateUser);
      setEditUser(false);
      setMessage("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Failed to update user");
    }
  };

  //DELETE
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(null);
      setMessage("User deleted successfully");
      navigate("/account");
    } catch (error) {
      console.error("Error Deleting User", error);
    }
  };

  return (
    <>
      <div>
        {error ? (
          <h1>{error}</h1>
        ) : user ? (
          <div>
            <Card className="cardacct">
              <CardContent>
                {editUser ? (
                  <>
                    <input
                      type="text"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={user.address}
                      onChange={(e) =>
                        setUser({ ...user, address: e.target.value })
                      }
                    />
                    {isAdmin && (
                      <select
                        value={user.role}
                        onChange={(e) =>
                          setUser({ ...user, role: e.target.value })
                        }
                      >
                        <option value="ADMIN">ADMIN</option>
                        <option value="USER">USER</option>
                      </select>
                    )}
                    <Button className="admin-button" onClick={handleSave}>Save</Button>
                    <Button className="admin-button" onClick={() => setEditUser(false)}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <h1>{user.email}</h1>
                    <h5>Name: {user.name}</h5>
                    <h5>Address: {user.address}</h5>
                    <h5>Role: {user.role}</h5>
                    {isAdmin && (
                      <>
                        <Button className="admin-button" onClick={handleEdit}>Edit</Button>
                        <Button className="admin-button" onClick={handleDelete}>Delete</Button>
                      </>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <h1>Loading ...</h1>
        )}
      </div>
    </>
  );
};

export default AdminUser;