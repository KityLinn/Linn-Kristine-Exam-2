import { auctionUrls } from '../api/Apiutils';
const token = localStorage.getItem("token");


export function DeleteVenue(id) {
    async function deleteFunc (deleteUrl) {
        const res = await fetch (deleteUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`,
            },
    
        });
        const data = await res.json();
        console.log(data)   

    }
    deleteFunc(auctionUrls.deleteVenue(id))
  }
    