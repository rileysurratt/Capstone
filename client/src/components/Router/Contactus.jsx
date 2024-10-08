import React, { useState, useEffect } from "react";
import { Dropdown, Button, Form, Alert } from "react-bootstrap";
import emailjs from '@emailjs/browser';



const Contactus = () => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setShowWarning(true);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error fetching user data");
        }
        const userInfo = await response.json();
        setUser(userInfo);
        setShowWarning(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setShowWarning(true);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const handleSelect = (eventKey) => {
    setSelectedTopic(eventKey);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!user) {
      alert("Please log in before contacting us.");
      return;
    }
  
    try {
      const templateParams = {
        from_name: user.user.email,
        to_name: 'Admin',
        subject: `${selectedTopic}`,
        message: `Message from ${user.user.name}: ${message}`,
      };
  
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,  
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,  
        templateParams,
        import.meta.env.VITE_EMAILJS_USER_ID       
      );
  
      if (response.status === 200) {
        alert('Email sent successfully!');
        setMessage('');
        setSelectedTopic('');
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again later.');
    }
  };
  
  
  return (
    <div>
      <h1>Contact Us Below:</h1>

      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle id="dropdown-basic" className="dropdown-color" >
          {selectedTopic || "Select a Topic"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="Question">Question</Dropdown.Item>
          <Dropdown.Item eventKey="Complaint">Complaint</Dropdown.Item>
          <Dropdown.Item eventKey="Recommendations">
            Recommendations
          </Dropdown.Item>
          <Dropdown.Item eventKey="Price Match">Price Match</Dropdown.Item>
          <Dropdown.Item eventKey="Request a Part/Product">Request a Part/Product</Dropdown.Item>
          <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {showWarning && <Alert variant="warning">Please log in before contacting us.</Alert>}

      <Form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <Form.Group controlId="formMessage">
      <Form.Control
        className="form-color"
            as="textarea"
            placeholder="Input you message here"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          className="second-button"
          variant="primary"
          type="submit"
          disabled={!user}
        >
          Send Email
        </Button>
      </Form>
    </div>
  );
};

export default Contactus;
