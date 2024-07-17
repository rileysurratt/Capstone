//Fetch account by user that is currently logged in.
//Order History Linked Here
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/me`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
        {/* You can optionally add a login button here */}
      </div>
    );
  }

  // User is logged in
  return (
    <>
      <h1>Hello, {user.username}!</h1>
      <h2>Account Page Placeholder</h2>
      <Button
        type="submit"
        className="book mb-2"
        variant="secondary"
        color="primary"
        style={{ backgroundColor: "white", color: "black" }}
        onClick={() => navigate(`/orderhistory`)}
      >
        Order History
      </Button>
    </>
  );
};

export default Account;
