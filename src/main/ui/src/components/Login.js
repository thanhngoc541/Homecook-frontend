import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
function Login() {
  return (
    <Container>
      <Row>
        <Col xs="6">
          <div className="left">

          </div>
        </Col>
        <Col xs="6">
          <div className="loginForm">
            <h3 className="mb-1">Welcome</h3>
            <p lg="6" className="mb-5">
              Sign in to your account to continue
              </p>
            <form>
              <FormGroup>
                <Label for="exampleEmail">Username</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="Enter username" />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="Enter password" />
              </FormGroup>
              <Button>Login</Button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
    // <div className="container">
    //   <div xs="6" className="login-left">Hi bab</div>
    //   <div xs="6" className="login-right">
    //     Hi
    //   </div>
    // </div>
  );
}
export default Login
