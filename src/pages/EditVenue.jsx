import { useEffect, useState } from "react";
import { auctionUrls } from "../api/Apiutils";
import { useParams } from "react-router-dom";
import { Newvenue } from "./Newvenue";

export function EditVenue() {
  const [venue, setVenue] = useState([]);
  const { id } = useParams();


  async function getData() {
    const res = await fetch(auctionUrls.singleVenue(id));
    const json = await res?.json();
    const data = json?.data;
    if (data) {
      setVenue(data);
    }
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <>
    {venue ?
      <Newvenue editVenue={venue} />
      :
      <p>Loading...</p>
    }
    </>
  );
}