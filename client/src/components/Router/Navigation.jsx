//This will have the routes to: HOME, CATALOG
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Navigation({ navLinks }) {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to Capstone</h1>
      <Button
        variant="secondary"
        className="ml-2"
        onClick={() => navigate(`/`)}
      >
        Home
      </Button>
      <Button
        variant="secondary"
        className="ml-2"
        onClick={() => navigate(`/catalog`)}
      >
        Products
      </Button>
    </div>
  );
}

export default Navigation;
