import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auctionUrls } from '../api/Apiutils';
import { Row } from "react-bootstrap";


export function Newvenue() { 
    const token = localStorage.getItem("token");
    const creaListing = async (venueUrl, venueData) => {

        const res = await fetch (venueUrl, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(venueData),
        });
        const data = await res.json(); 
        console.log(data)
    }



    return (
        <>
        
        </>
     )
        


}