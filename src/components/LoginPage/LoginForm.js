import React, { useState } from 'react';
import { Form, FormGroup, FormControl, Button, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import './LoginPage.css';

const div1Style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  height: 50
};

const div2Style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  height: 500,
};

const cardStyle = {
  backgroundColor: '#ECFDFF',
  border: 0,
  paddingLeft: 20,
  paddingRight: 20,
  width: 300,
};

const buttonStyle = {
  marginTop: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  let handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:5000/users/authenticate`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        user_type: 0
        }),
    }).then(res => {
      if (res.status === 200) {
        setMessage("Login successful");
        console.log(message);
        navigate("/communitySearch", { replace: true });
      } else {
        res.text().then(text => {
          setMessage(text);
          setShowModal(true);
        });
      }
    }).catch(error => console.error(error));
  };
  const closeModal = () => {
    setShowModal(false);
    setMessage("");
  };
    return (
      <div>
        <Modal show={showModal} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
          </Modal.Footer>
        </Modal>
        <div style={div1Style}>
          <h2>iParametrics</h2>
        </div>
        <div style={div1Style}>
          <h4><b>Community Willingness and Capability Score</b></h4>
        </div>
        <div style={div2Style}>
            <Form className="LoginForm" id="loginForm" onSubmit={handleSubmit}>
              <FormGroup>
                <Form.Label>Username</Form.Label>
                <FormControl type="username" placeholder="Username" autoComplete='username' onChange={(e) => setUsername(e.target.value)}/>
                <Form.Label>Password</Form.Label>
                <FormControl type="password" placeholder="Password" autoComplete='password' onChange={(e) => setPassword(e.target.value)}/>
                <div style={buttonStyle}>
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </div>
                <div style={buttonStyle}>
                  <Button color="white" variant="outline-secondary" onClick={() => navigate("/createAccount", { replace: true })}>
                    Create Account
                  </Button>
                </div>
              </FormGroup>
            </Form>
        </div>
      </div>
    );
}

export default LoginForm;