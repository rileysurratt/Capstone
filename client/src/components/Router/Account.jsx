//Fetch account by user that is currently logged in.
//Order History Linked Here
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";


const Account = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Account Page Placeholder</h1>
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
