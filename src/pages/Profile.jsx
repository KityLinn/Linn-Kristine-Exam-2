import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auctionUrls } from '../api/Apiutils';
import { Row } from "react-bootstrap";

export function Profile() {
    const { name } = useParams();
    document.title = `Holidaze | ${name} profile`;
    const [profile, setProfile] = useState([]);
    useEffect(() => {
      async function getData() {
        const response = await fetch(auctionUrls.singleProfile(name));
        const json = await response.json();
        setProfile(json.data);
      }
      getData();
    }, []);
    console.log(profile)

    return (
        <>
        <h1>Profile</h1>
        </>
      );
 }