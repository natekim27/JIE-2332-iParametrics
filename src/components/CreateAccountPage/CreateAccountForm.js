import { useState } from 'react';
import { Form, FormGroup, FormControl, Button, Modal } from 'react-bootstrap';

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

const buttonStyle = {
  marginTop: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
};

const CreateAccountForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setShowModal(true);
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
        setErrorMessage("Login successful");
        setShowModal(true);
        navigate('/', {replace: true});
      } else {
        console.log(res.status);
      }
    }).catch(error => console.error(error));
  };

  const closeModal = () => {
    setShowModal(false);
    setErrorMessage("");
  };

  return (
    <div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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