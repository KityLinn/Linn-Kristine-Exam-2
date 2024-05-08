import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";





export function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <header>
          <Navbar className="bg-white shadow-sm mb-3 d-md-none">
            <Button
              variant="outline-primary"
              className=" border-2"
              onClick={handleShow}
            >
              <span className="navbar-toggler-icon"></span>
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements
                you have chosen. Like, text, images, lists, etc.
              </Offcanvas.Body>
            </Offcanvas>
          </Navbar>
          <Navbar className="d-none d-md-flex">
            <h1>hi</h1>
          </Navbar>
      </header>
    </>
  );
}
 