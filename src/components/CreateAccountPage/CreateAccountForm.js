import React, { useState } from 'react';
import { Card, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


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
  backgroundColor: '#FEFFD3',
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

const CreateAccountForm = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      console.log(message);
      return;
    }
    fetch(`http://127.0.0.1:5000/users/create-account`, {
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
        navigate('/', {replace: true});
      } else {
        console.log(res.status);
      }
    }).catch(error => console.error(error));
  };
  const navigate = useNavigate();
  return (
    <div>
      <div style={div1Style}>
          <h4><b>Community Willingness and Capability Score</b></h4>
        </div>
        <div style={div2Style}>
        <Form className="CreateAccountForm" id="CreateAccountForm" onSubmit={handleSubmit}>
          <FormGroup>
          <Form.Label>Username</Form.Label>
              <FormControl type="username" placeholder="Username" autoComplete='username' onChange={(e) => setUsername(e.target.value)}/>
              <Form.Label>Password</Form.Label>
              <FormControl type="password" placeholder="Password" autoComplete='password' onChange={(e) => setPassword(e.target.value)}/>
            <Form.Label>Confirm Password</Form.Label>
            <FormControl
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
            <div style={buttonStyle}>
              <Button variant="primary" type="submit">
                Create Account
              </Button>
            </div>
            <div style={buttonStyle}>
              <Button variant="outline-secondary" onClick={() => navigate('/', {replace: true})}>
                Back to Login
              </Button>
            </div>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
}

export default CreateAccountForm;
