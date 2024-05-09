import { auctionUrls } from '../api/Apiutils';



export function Register(data) {
    async function registerFunc (userData, registerUrl) {
        const res = await fetch (registerUrl, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const data = await res.json();
        console.log(data)   
 

    }
    registerFunc(data, auctionUrls.register)
  }
    