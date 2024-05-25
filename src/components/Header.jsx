import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";
import { NavLink, Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export function Header() {
  const [isLogged, setisLogged] = useState(false);
  const [isManager, setIsmanager] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate()

  const loggedIn = localStorage.getItem("name");
  const manager = localStorage.getItem("manager");

  useEffect(() => {
    function statusSet() {
      if (manager) {
        setIsmanager(manager);
      } else {
        setIsmanager(false);
      }
      if (loggedIn) {
        setisLogged(true);
      } else {
        setisLogged(false);
      }
    }
    statusSet();

  }, [navigate]);

  return (
    <>
      <header className="bg-secondary">
        <Navbar className="d-md-none">
          <Button
            variant="outline-primary"
            className="border-2 bg-white ms-auto me-3"
            onClick={handleShow}
          >
            <span className="navbar-toggler-icon fs-6"></span>
          </Button>

          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body>
              <ul className="nav w-100 d-flex flex-column">
                <li className="nav-item ">
                  <Link to="/venues" className="nav-link px-2 text-muted">
                    Venues
                  </Link>
                </li>
                {isLogged && (
                  <li className="nav-item">
                    <Link
                      to={"/profile/" + loggedIn}
                      className="nav-link px-2 text-muted"
                    >
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
                {isLogged && (
                  <li className="nav-item">
                    <Link to="/logout" className="nav-link px-2 text-muted">
                      Logout
                    </Link>
                  </li>
                )}
              </ul>
            </Offcanvas.Body>
          </Offcanvas>
        </Navbar>
        <Navbar className="d-none d-md-flex">
          <ul className="nav w-100">
            <li className="nav-item">
              <Link to="/venues" className="nav-link px-2 text-white">
                Venues
              </Link>
            </li>
            {isLogged && (
              <li className="nav-item">
                <Link
                  to={"/profile/" + loggedIn}
                  className="nav-link px-2 text-white"
                >
                  Profile
                </Link>
              </li>
            )}
            {isManager && (
              <li className="nav-item">
                <Link to="/newvenue" className="nav-link px-2 text-white">
                  Create Venue
                </Link>
              </li>
            )}
          </ul>
          {isLogged ? (
            <Link
              to="/logout"
              className="nav-link px-2 text-muted btn btn-outline-primary bg-white p-1 me-2"
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className="nav-link px-2 text-muted btn btn-outline-primary bg-white p-1 me-2"
            >
              Login
            </Link>
          )}
        </Navbar>
      </header>
    </>
  );
}
 