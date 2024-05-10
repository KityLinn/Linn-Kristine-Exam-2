import { auctionUrls } from '../api/Apiutils';
import { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button, Offcanvas, Modal, Col, Row, Form } from "react-bootstrap";
import { VenueItem } from '../components/VenueItem';

export function Venues() {

  const [venues, setVenues] = useState([]);
  const [searchVenues, setSearchVenues] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function getData() {
      const response = await fetch(auctionUrls.venues(20));
      const json = await response.json();
      setVenues(json.data);
      setSearchVenues(json.data)
      
    }
    getData();
  }, []);
  console.log(venues)
    return (
     <>
      <Row xs={1} md={2} lg={3} className="g-3">
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
 