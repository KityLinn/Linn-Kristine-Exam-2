import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auctionUrls } from '../api/Apiutils';
import { Row } from "react-bootstrap";


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

    return (
     <>
     <h1>Singlevenue</h1>
     </>
   );
 }
 