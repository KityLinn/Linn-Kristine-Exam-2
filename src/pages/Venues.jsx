import { auctionUrls } from '../api/Apiutils';
import { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button, Offcanvas, Modal, Col, Row, Form } from "react-bootstrap";
import { VenueItem } from '../components/VenueItem';

export function Venues() {
  document.title = "Holidaze | Venues";

  const [venues, setVenues] = useState([]);
 
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  async function getData() {
    const res = await fetch(auctionUrls.venues(20, page));
    const json = await res?.json();
    const data = json?.data;
    if (data) {
      setVenues(data)
    }

  }
  async function getSearch() {
    const res = await fetch(auctionUrls.searchVenue(search));
    const json = await res?.json();
    const data = json?.data;
    if (data) {
      setVenues(data)
      setPage(1)
    }
  }


  useEffect(() => {
    getData();
  }, [page]);



  function pageUp() {
    setPage(page + 1);
    topFunction();
  }
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  function searchFunc (e) {
    return setSearch(e.target.value.toLowerCase())
   }

   useEffect(()=> {
    if (search) {
      getSearch();
    } else {
      getData()
    }
  }, [search]);


  return (
    <>
      <section className="d-flex flex-column justify-content-center align-items-center">
        <Form.Group
          controlId="searchForm"
        >
          <Form.Control
            className="mt-1"
            type="text"
            placeholder="Search.."
            onChange={searchFunc}
            style={{
              maxWidth: "400px",
              width: "100vw"
            }}
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
        <Button onClick={pageUp} className='mt-5'>Show more</Button>
      </section>
    </>
  );
}
 