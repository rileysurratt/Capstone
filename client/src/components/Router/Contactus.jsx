import React, { useState, useEffect } from "react";
import { Dropdown, Button, Form, Alert } from "react-bootstrap";

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
        const response = await fetch(`http://localhost:3000/api/users/me`, {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user) {
      alert("Please log in before contacting us.");
      return;
    }

    console.log(`Selected topic: ${selectedTopic}`);
    console.log(`Message: ${message}`);
    // Here you would add the code to actually send the email
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Contact Us Below!</h1>

      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle id="dropdown-basic">
          {selectedTopic || "Select a Topic"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="Question">Question</Dropdown.Item>
          <Dropdown.Item eventKey="Complaint">Complaint</Dropdown.Item>
          <Dropdown.Item eventKey="Recommendations">
            Recommendations
          </Dropdown.Item>
          <Dropdown.Item eventKey="Price Match">Price Match</Dropdown.Item>
          <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {showWarning && <Alert variant="warning">Please log in before contacting us.</Alert>}

      <Form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <Form.Group controlId="formMessage">
          <Form.Label>Type Your Message Below</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </Form.Group>

        <Button
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
