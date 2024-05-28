import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { auctionUrls } from '../api/Apiutils';
import { Row, Carousel, Col, Button, Modal, Card} from "react-bootstrap";
import { Booking } from "../components/Booking";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export function Singlevenue() {
  const mail = localStorage.getItem("email");
  const loggedIn = localStorage.getItem("name");
  const token = localStorage.getItem("token");


  const navigate = useNavigate();

  const [isLogged, setisLogged] = useState(false);
  function statusSet() {
    if (loggedIn) {
      setisLogged(true);
    } else {
      setisLogged(false);
    }
  }

  const { id } = useParams();
  const [venue, setVenue] = useState([]);

  
  document.title = `Holidaze | ${venue.name}`;
  document.getElementsByTagName('meta')["description"].content = `${venue.description}`;

  const [showBooking, setShowBooking] = useState(false);

  const openBookingModal = () => setShowBooking(true);
  const closeBookingModal = () => setShowBooking(false);


  async function getData() {
    const res = await fetch(auctionUrls.singleVenue(id));
    const json = await res?.json();
    const data = json?.data;
    if (data) {
      setVenue(data);
    }
  }

  async function deleteVenue() {
    const res = await fetch(auctionUrls.deleteVenue(venue.id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "46dbf285-76f9-4d79-985d-91ee829f49a2",
      },
    });
    toast.success("Venue deleted!");
    navigate("/venues");
  }

  useEffect(() => {
    getData();
    statusSet();
  }, []);

  return (
    <>
      <section className="d-flex justify-content-center align-items-center mt-5 flex-column">
        <Row style={{ maxWidth: "800px" }} >
          <Carousel fade>
            {venue.media?.map((i, j) => {
              return (
                <Carousel.Item key={j}>
                  <img
                    className="d-block"
                    src={i.url}
                    alt={i.alt}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      maxHeight: "400px",
                    }}
                  />
                  <Carousel.Caption>
                    <p className="fs-3">{i.alt}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
          <Row className="d-flex mt-3 justify-content-between w-100">
            <Col>
              <div>
                <h1 className="fs-3">{venue.name}</h1>
              </div>
            </Col>
            <Col>
              <div className="d-flex justify-content-end">
                <p className="fs-3">{venue.price} Kr</p>
              </div>
            </Col>
          </Row>
          <Row>
            <div>
              <p>{venue.description}</p>
            </div>
          </Row>
          <Row className="d-flex mt-3">
            <Col>
              {venue.location && (
                <div>
                  <h3>Location:</h3>
                  <p>Adress: {venue.location.address}</p>
                  <p>City: {venue.location.city}</p>
                  <p>Country: {venue.location.country}</p>
                  <p>Continet: {venue.location.continent}</p>
                </div>
              )}
            </Col>
            <Col className="d-flex justify-content-end">
              <div className=" d-flex flex-column">
                {venue.meta ? (
                  <>
                    <h3>Features:</h3>
                    {Object.keys(venue.meta).map((i) => {
                      return venue.meta[i] ? <p key={i}>{i}</p> : "";
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </Col>
          </Row>
          {isLogged && (
            <div className="d-inline-block">
              <Button className="mb-3" onClick={openBookingModal}>
                Book this venue
              </Button>
            </div>
          )}

          <Modal show={showBooking} onHide={closeBookingModal}>
            <Modal.Header closeButton>
              <h2>Book venue</h2>
            </Modal.Header>
            <Modal.Body>
              <Booking venue={venue} onDone={closeBookingModal}></Booking>
            </Modal.Body>
          </Modal>
        </Row>
      </section>
      <section className="d-flex align-items-center justify-content-center flex-column">
        {mail == venue.owner?.email && (
          <div
            style={{ maxWidth: "800px" }}
            className="w-100 d-flex gap-4 border-top border-2 pt-4"
          >
            <div className="d-inline-block">
              <Button variant="danger" className="p-2" onClick={deleteVenue}>
                Delete venue
              </Button>
            </div>
            <div className="d-inline-block">
              <Link
                to={"/editvenue/" + venue.id}
                className="btn btn-primary p-2"
              >
                Edit venue
              </Link>
            </div>
          </div>
        )}
      </section>
      {mail == venue.owner?.email && (
        <section className="d-flex justify-content-center align-items-center mt-4 flex-column">
          <div
            style={{ maxWidth: "800px" }}
            className="w-100 border-top border-2 pt-5"
          >
            <Row>
              {venue.bookings?.length > 0 && (
                <>
                  <h3>Bookings:</h3>
                  {venue.bookings.map((b, i) => {
                    let f = new Date(b.dateFrom);
                    let from =
                      f.getDate() + "/" + f.getMonth() + "/" + f.getFullYear();
                    let t = new Date(b.dateTo);
                    let to =
                      t.getDate() + "/" + t.getMonth() + "/" + t.getFullYear();
                    return (
                      <Col xs="6" sm="4" key={i}>
                        <Card border="primary">
                          <Card.Header>{b.customer.name}</Card.Header>
                          <Card.Body>
                            <p>From: {from}</p>
                            <p>To: {to} </p>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </>
              )}
            </Row>
          </div>
        </section>
      )}
    </>
  );
}
 
