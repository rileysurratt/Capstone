//About Us, Contact Us, Request a Product, Reviews

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

function Footer({ footerLinks }) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="footer-images">
        <img src="/hp.png" alt="HP" className="HP Logo" />
        <img src="/nvidia.png" alt="Nvidia" className="Nvidia Logo" />
        <img src="/razer.png" alt="Razer" className="Razer Logo" />
        <img src="/microsoft.png" alt="Microsoft" className="Microsoft Logo" />
        <img src="/blue.png" alt="Blue" className="Blue Logo" />
      </div>
      <div className="footer-buttons">
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
      {/* <Button
        variant="secondary"
        className="ml-2"
        onClick={() => navigate(`/requestproduct`)}
      >
        Request a Product
      </Button> */}
      {/* <Button
        variant="secondary"
        className="ml-2"
        onClick={() => navigate(`/review`)}
      >
        Add/Read Reviews
      </Button> */}
      </div>
    </div>
  );
}

export default Footer;
