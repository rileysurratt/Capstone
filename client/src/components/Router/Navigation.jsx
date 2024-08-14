//This will have the routes to: HOME, CATALOG
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './Navigation.css'

function Navigation({ navLinks }) {
  const navigate = useNavigate();
  return (
    <nav className="navigation"> 
      <h1 className="navigation-title">TKR COMPUTERS</h1>
      <div className="navigation-buttons">
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
    </nav>
  );
}

export default Navigation;
