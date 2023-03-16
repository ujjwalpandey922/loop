import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import "./Style.css";
const Login = ({ data }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const NavTo = useNavigate();

  //Login Handle
  const handleLogIn = () => {
    if (!name || !password) {
      toast.error("enter all fields");
      return;
    }
    console.log(data, name, password);
    data.records.forEach((e) => {
      let userId = JSON.parse(localStorage.getItem(`userInfo`));
      if (e.fields.username === name && e.fields.password === password) {
        if (userId === null) {
          localStorage.setItem(`userInfo`, JSON.stringify(e));
        } else {
          localStorage.setItem(`userInfo`, JSON.stringify(userId));
          console.log(userId);
        }

        toast.success("WELCOME");
        NavTo("/home");
      }
    });
    toast.error("User Not Found");
  };
  return (
    <>
      <Container className="d-flex flex-column justify-content-start my-5 ">
        <Row className="mb-3 my-5 ">
          <Col className="text-center Title" md={{ span: 3, offset: 5 }}>
            Loop Kitchen
          </Col>
        </Row>
        <Row>
          <Col className="Title" md={{ span: 3, offset: 5 }}>
            <Form>
              <Form.Group className="mb-2" controlId="Basicusername">
                <Form.Label>User Name </Form.Label>
                <Form.Control
                  value={name}
                  type="text"
                  placeholder="Enter User Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  value={password}
                  type={show ? "text" : "password"}
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShow(!show)}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputGroup>

              <Button
                variant="primary"
                style={{ width: "100%", marginTop: "8px" }}
                onClick={handleLogIn}
              >
                Log In
              </Button>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Login;
