import { auctionUrls } from '../api/Apiutils';
import { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button, Offcanvas, Modal, Col, Row, Form } from "react-bootstrap";

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

     </>
   );
 }
 