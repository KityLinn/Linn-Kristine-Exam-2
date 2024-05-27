import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { auctionUrls } from '../api/Apiutils';
import { Row, Carousel, Col, Button, Modal, Card} from "react-bootstrap";
import { Booking } from "../components/Booking";


export function Singlevenue() {
  const mail = localStorage.getItem("email");
  const loggedIn = localStorage.getItem("name");
  const token = localStorage.getItem("token");

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

  const [showBooking, setShowBooking] = useState(false);

  const openBookingModal = () => setShowBooking(true);
  const closeBookingModal = () => setShowBooking(false);
  document.title = `Holidaze | ${venue.name}`;

  async function getData() {
    const res = await fetch(auctionUrls.singleVenue(id));
    const json = await res?.json();
    const data = json?.data;
    if (data) {
      setVenue(data);
    }
  }

  async function deleteVenue () {
    const res = await fetch(auctionUrls.deleteVenue(venue.id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "46dbf285-76f9-4d79-985d-91ee829f49a2",
      },
    });
    const data = await res.json();

  }

  useEffect(() => {
    getData();
    statusSet();
  }, []);



  return (
    <>
      <section className="d-flex justify-content-center align-items-center mt-5 flex-column">
        <Row
          style={{ maxWidth: "800px" }}
          className="border border-2 border-black px-2"
        >
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
              <Button className=" mb-4" onClick={openBookingModal}>
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
      <section className="d-flex justify-content-center align-items-center mt-5">
        <div style={{ maxWidth: "800px" }} className="w-100">
          {mail == venue.owner?.email && (
            <Row>
              <div className="d-inline-block col col-3">
                <Button className="mb-4" variant="danger" onClick={deleteVenue}>
                  Delete venue
                </Button>
              </div>
              <div className="d-inline-block col col-3">
                <Link
                  to={"/editvenue/" + venue.id}
                  className="btn btn-primary p-2 mb-2"
                >
                  Edit venue
                </Link>
              </div>
            </Row>
          )}
        </div>
      </section>
      {mail == venue.owner?.email && (
        <section className="d-flex justify-content-center align-items-center mt-5 flex-column">
          <div style={{ maxWidth: "800px" }} className="w-100">
            <Row>
              {venue.bookings?.length > 0  && (
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
                      <Col xs="3" key={i}>
                        <Card>
                          <Card.Header>{b.customer.name}</Card.Header>
                          <Card.Body>
                            <p>From:{from}</p>
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
 
