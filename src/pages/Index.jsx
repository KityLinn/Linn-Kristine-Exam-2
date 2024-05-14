import { Container, Button, Offcanvas, Modal, Col, Row, Form } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { Login } from "../hooks/Login";
import { Register } from "../hooks/Register";


export function Index() {

// modal state and func
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
  


  return (
    <>
      {/*Row with login box, login button and register button */}
      <Row className="d-flex align-items-center justify-content-center mt-5">
        <Form
          onSubmit={handleSubmit(Login)}
          style={{ maxWidth: "600px" }}
          className="border border-1 border-black p-3 rounded-1"
        >
          <h1>Login</h1>
          <Form.Group className="mb-3" controlId="formMail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className={errors.Email && "error"}
              type="text"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: {
                  value: 3,
                  message: "Email must be more than 3 characters",
                },
              })}
            />
            <p>{errors.Email?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className={errors.password && "error"}
              type="password"
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
      <Modal show={show} onHide={handleClose} animation={true} centered>
        <Modal.Header closeButton>
          <Modal.Title><h1>Register</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit2(Register)}
            style={{ maxWidth: "600px" }}
            className="border border-1 border-black p-3 rounded-1"
          >
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className={errors2.username && "error"}
                type="text"
                placeholder="Username"
                {...register2("name", {
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
                {...register2("email", {
                  required: true,
                  pattern: {
                    value: /\S+@stud.noroff.no/,
                    message: "Email must end with @stud.noroff.no",
                  },
                })}
              />
              <p>{errors2.email?.message}</p>
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
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <p>{errors2.password?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="managerChecked">
              <Form.Label>Register as venueManager</Form.Label>
              <Form.Check 
                type="checkbox"
                {...register2("venueManager")}
              />
              <p>{errors2.password?.message}</p>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Register
              </Button>
              <Button variant="outline-primary" onClick={handleClose}>
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
