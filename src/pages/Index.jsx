import { Navbar, Nav, Container, Button, Offcanvas, Modal, Col, Row, Form } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';


export function Index() {

// modal states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
// form state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();
  
//login function
  function loginSubmit(data) {
    console.log(data);
  }
//register function
  function registerSubmit(data) {
    console.log(data);
  }

  return (
    <>
     {/*Row with login box, login button and register button */}
      <Row className="d-flex align-items-center justify-content-center mt-5">
        <Form
          onSubmit={handleSubmit(loginSubmit)}
          style={{ maxWidth: "600px" }}
          className="border border-1 border-black p-3 rounded-1"
        >
          <h1>Login</h1>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className={errors.username && "error"}
              type="text"
              placeholder="Username"
              {...register("username", {
                required: true,
                minLength: {
                  value: 3,
                  message: "Username must be more than 3 characters",
                },
              })}
            />
            <p>{errors.username?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className={errors.password && "error"}
              type="text"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 3,
                  message: "Password must be more than 3 characters",
                },
              })}
            />
            <p>{errors.password?.message}</p>
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Button variant="outline-primary" onClick={handleShow}>
              Register as new user
            </Button>
          </div>
        </Form>
      </Row>

        {/*Modal with login box, login button and register button */}
        <Modal show={show} onHide={handleClose} animation={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={handleSubmit2(registerSubmit)}
              style={{ maxWidth: "600px" }}
              className="border border-1 border-black p-3 rounded-1"
            >
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  className={errors2.username && "error"}
                  type="text"
                  placeholder="Username"
                  {...register2("username", {
                    required: true,
                    minLength: {
                      value: 3,
                      message: "Username must be more than 3 characters",
                    },
                  })}
                />
                <p>{errors2.username?.message}</p>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className={errors2.email && "error"}
                  type="text"
                  placeholder="Email"
                  {...register2("Email", {
                    required: true,
                    minLength: {
                      value: /\S+@\S+\.\S+/,
                      message: "Email must be valid",
                    },
                  })}
                />
                <p>{errors2.username?.message}</p>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className={errors2.password && "error"}
                  type="text"
                  placeholder="Password"
                  {...register2("password", {
                    required: true,
                    minLength: {
                      value: 3,
                      message: "Password must be more than 3 characters",
                    },
                  })}
                />
                <p>{errors2.password?.message}</p>
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button variant="primary" type="submit">
                  Register
                </Button>
                <Button variant="outline-primary"  onClick={handleClose}>
                  Close
                </Button>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
    </>
  );
}
