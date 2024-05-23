import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auctionUrls } from '../api/Apiutils';
import { Row, Carousel, Col } from "react-bootstrap";


export function Singlevenue() {
  const { id } = useParams();
  const [venue, setVenue] = useState([]);

  async function getData() {
    const res = await fetch(auctionUrls.singleVenue(id));
    const json = await res?.json();
    const data = json?.data;
    if (data) {
      setVenue(data)
    }
  }

  useEffect(() => {
    getData();
  }, []);
  
console.log(venue)
  return (
    <>
      <section className="d-flex justify-content-center align-items-center mt-5 flex-column gap-5 border border-2 border-black">
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
                  <p className="fs-3">{i.alt}</p>
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
            <h1 className="fs-3">{venue.name}</h1>
          </Col>
          <Col className="text-end">
            <p className="fs-3">{venue.price} Kr</p>
          </Col>
        </Row>
        <Row style={{ width: "600px" }}>
          <p>{venue.description}</p>
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
        </Row>
      </section>
    </>
  );
}
 
