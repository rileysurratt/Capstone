//About Us, Contact Us, Request a Product, Reviews

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Footer({ footerLinks }) {
  const navigate = useNavigate();
  return (
    <div>
      <h1>The Footer of the Site</h1>
      <Button
        variant="secondary"
        className="ml-2"
        onClick={() => navigate(`/aboutus`)}
      >
        About Us!
      </Button>
      <Button
        variant="secondary"
        className="ml-2"
        onClick={() => navigate(`/contactus`)}
      >
        Contact Us
      </Button>
      <Button
        variant="secondary"
        className="ml-2"
        onClick={() => navigate(`/requestproduct`)}
      >
        Request a Part/Product
      </Button>
      <Button
        variant="secondary"
        className="ml-2"
        onClick={() => navigate(`/review`)}
      >
        Add/Read Reviews
      </Button>

    </div>
  );
}

export default Footer;