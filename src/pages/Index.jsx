import { Navbar, Nav, Container, Button, Offcanvas, Modal, Col, Row, Form } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';


export function Index() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit, formState: { errors } } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

    return (
      <>
        <Row className="d-flex align-items-center justify-content-center">
          <Form
            onSubmit={handleSubmit(onSubmit)}
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
              <Button variant="primary" onClick={handleShow}>
                Register
              </Button>
            </div>
          </Form>
        </Row>

        <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form
            onSubmit={handleSubmit(onSubmit)}
            style={{ maxWidth: "600px" }}
            className="border border-1 border-black p-3 rounded-1"
          >
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
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className={errors.email && "error"}
                type="text"
                placeholder="Email"
                {...register("Email", {
                  required: true,
                  minLength: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email must be valid",
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
                Register
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
  
        </Modal.Footer>
      </Modal>
      </>
    );
 }
 
 /*
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
*/