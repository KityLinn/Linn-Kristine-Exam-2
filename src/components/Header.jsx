import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";


export function Header() {
  const [isLogged, setisLogged] = useState(false);
  const [isManager, setIsmanager] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loggedIn = localStorage.getItem("name");
  const manager = localStorage.getItem("manager");

  useEffect(() => {
    function statusSet() {
      if (manager) {
        setIsmanager(manager);
      }
      if (loggedIn) {
        setisLogged(true);
      }
    }
    statusSet();
    window.addEventListener("status", statusSet);
  }, []);

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
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body>
              <ul className="nav w-100 d-flex flex-column">
                <li className="nav-item">
                  <Link to="/venues" className="nav-link px-2 text-muted">
                    Venues
                  </Link>
                </li>
                {isLogged && (
                  <li className="nav-item">
                    <Link to= {"/profile/" + loggedIn} className="nav-link px-2 text-muted">
                      Profile
                    </Link>
                  </li>
                )}
                {isManager && (
                  <li className="nav-item">
                    <Link to="/newvenue" className="nav-link px-2 text-muted">
                      Create Venue
                    </Link>
                  </li>
                )}
              </ul>
            </Offcanvas.Body>
          </Offcanvas>
        </Navbar>
        <Navbar className="d-none d-md-flex shadow-sm mb-3">
          <ul className="nav w-100">
            <li className="nav-item">
              <Link to="/venues" className="nav-link px-2 text-muted">
                Venues
              </Link>
            </li>
            {isLogged && (
              <li className="nav-item">
                <Link to={"/profile/" + loggedIn} className="nav-link px-2 text-muted">
                  Profile
                </Link>
              </li>
            )}
            {isManager && (
              <li className="nav-item">
                <Link to="/newvenue" className="nav-link px-2 text-muted">
                  Create Venue
                </Link>
              </li>
            )}
          </ul>
        </Navbar>
      </header>
    </>
  );
}
 