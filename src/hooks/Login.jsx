import { auctionUrls } from '../api/Apiutils';




export function Login(data) {

    async function loginFunc (userData, loginUrl) {
        const res = await fetch (loginUrl, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const response = await res.json();
        const data = response.data
   
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("name", data.name);
        localStorage.setItem("manager", data.venueManager);
        window.dispatchEvent(new Event("status"))

    }
    loginFunc(data, auctionUrls.login)
  }
    