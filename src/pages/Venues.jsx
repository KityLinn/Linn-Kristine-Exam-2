import { auctionUrls } from '../api/Apiutils';
import { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button, Offcanvas, Modal, Col, Row, Form } from "react-bootstrap";
import { VenueItem } from '../components/VenueItem';

export function Venues() {
  document.title = "Holidaze | Venues";
  
  const [venues, setVenues] = useState([]);
  const [searchVenues, setSearchVenues] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function getData() {
      const response = await fetch(auctionUrls.venues(20));
      const json = await response.json();
      setVenues(json.data);
      setSearchVenues(json.data);
    }
    getData();
  }, []);
  console.log(venues);
  return (
    <>
      <Form.Group
        className="d-flex flex-column align-items-center justify-content-center"
        controlId="searchForm"
      >
        <Form.Control
          className="w-50 border-black border-2 mt-1"
          type="text"
          placeholder="Search.."
        />
      </Form.Group>
      <Row xs={1} md={2} lg={3} className="g-3 mt-5">
        {venues.map((post) => {
          return (
            <Col key={post.id}>
              <VenueItem {...post} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
 