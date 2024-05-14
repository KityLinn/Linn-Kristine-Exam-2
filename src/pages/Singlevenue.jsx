import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auctionUrls } from '../api/Apiutils';
import { Row, Carousel, Col } from "react-bootstrap";


export function Singlevenue() {
  const { id } = useParams();
  const [venue, setVenue] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await fetch(auctionUrls.singleVenue(id));
      const json = await response.json();
      setVenue(json.data);
    }
    getData();
  }, []);
console.log(venue)
  return (
    <>
      <section className=" d-flex justify-content-center align-items-center mt-5 flex-column gap-5">
        <Carousel>
          {venue.media?.map((i, j) => {
            return (
              <Carousel.Item key={j}>
                <img
                  className="d-block w-100"
                  src={i.url}
                  alt={i.alt}
                  style={{
                    objectFit: "cover",
                    maxWidth: "600px",
                    height: "400px",
                  }}
                />
                <Carousel.Caption>
                  <h3>{i.alt}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
        <Row
          className="d-flex flex-row justify-content-around"
          style={{ width: "600px" }}
        >
          <Col>
            <h1>{venue.name}</h1>
          </Col>
          <Col className="text-end">
            <h1>{venue.price} Kr</h1>
          </Col>
        </Row>
        <Row
          className="d-flex flex-row justify-content-around"
          style={{ width: "600px" }}
        >
          <Col>
            {venue.location ? (
              <>
                <h3>Location:</h3>
                <p>{venue.location.address}</p>
                <p>{venue.location.city}</p>
                <p>{venue.location.continent}</p>
                <p>{venue.location.country}</p>
              </>
            ) : (
              <></>
            )}
          </Col>
          <Col>
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
          </Col>
          <Col>
            {venue.bookings ? (
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
                    <p key={i}>
                      <span>{from}</span> -&gt; <span>{to}</span>
                    </p>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </section>
    </>
  );
}
 