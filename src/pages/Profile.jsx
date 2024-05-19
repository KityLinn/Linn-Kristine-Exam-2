import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auctionUrls } from '../api/Apiutils';
import { Row } from "react-bootstrap";

export function Profile() {
    const { name } = useParams();
    document.title = `Holidaze | ${name} profile`;
    const [profile, setProfile] = useState([]);
    auctionUrls.singleProfile(name)
    async function getData() {
      const token = localStorage.getItem("token");
      const response = await fetch(auctionUrls.singleProfile(name),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      setProfile(json);
    }
    console.log(profile)

    useEffect(() => {
      getData();
    }, []);


    return (
      <>
        <section className="d-flex align-items-center justify-content-center row mt-5">
          <div
            style={{ maxWidth: "600px" }}
            className="border border-1 border-black p-3 rounded-1"
          >
            
          </div>

        </section>
      </>
    );
 }