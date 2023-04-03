import React from 'react';
import { Card, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
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
    return (
      <div className='gillsans'>
        <div style={div1Style}>
          <h4><b>Community Willingness and Capability Score</b></h4>
        </div>
        <div style={div2Style}>
            <Form className="LoginForm" id="loginForm">
              <FormGroup>
                <Form.Label>Username</Form.Label>
                <FormControl type="username" placeholder="Username" autoComplete='username' />
                <Form.Label>Password</Form.Label>
                <FormControl type="password" placeholder="Password" autoComplete='password' />
                <div style={buttonStyle}>
                  <Button variant="outline-secondary" type="submit" onClick={() => navigate("/communitySearch", { replace: true })}>
                    Login
                  </Button>
                </div>
                <div style={buttonStyle}>
                  <Button color="white" variant="outline-secondary" type="submit" onClick={() => navigate("/createAccount", { replace: true })}>
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
