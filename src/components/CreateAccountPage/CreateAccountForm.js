import React from 'react';
import { Card, Form, FormGroup, FormControl, Button, HelpBlock, Row } from 'react-bootstrap';
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
  height: 500
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
  const navigate = useNavigate();
  return (
    <div>
      <div style={div1Style}>
        <h2>iParametrics</h2>
      </div>
      <div style={div1Style}>
        <h4>Create Account</h4>
      </div>
      <div style={div2Style}>
        <Card style={cardStyle}>
          <Form className="CreateAccountForm" id="CreateAccountForm">
            <FormGroup>
              <Form.Label>Username</Form.Label>
              <FormControl type="username" placeholder="Username" autoComplete='username'/>
              <Form.Label>Password</Form.Label>
              <FormControl type="password" placeholder="Password" autoComplete='current-password' />
              <Form.Label htmlFor="email">Confirm Password</Form.Label>
              <FormControl type="password" placeholder="Confirm Password" autoComplete='new-password' />
              <div style={buttonStyle}>
                <Button variant="outline-secondary" type="submit" onClick={() => navigate('/', {replace: true})}>
                  Create Account
                </Button>
              </div>
              <div style={buttonStyle}>
                <Button variant="outline-secondary" type="submit" onClick={() => navigate('/', {replace: true})}>
                  Back to Login
                </Button>
              </div>
            </FormGroup>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default CreateAccountForm;
