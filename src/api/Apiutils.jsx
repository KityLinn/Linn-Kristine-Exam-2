const BASE_URL = "https://api.noroff.dev/api/v1/";

export const auctionUrls = {
    login: BASE_URL + " ",
    register: BASE_URL + "holidaze/auth/register",
    editAvatar: (name) => BASE_URL + `holidaze/profiles/${name}/media`,
    listings: (amount) => BASE_URL + `holidaze/listings?limit=${amount}&_seller=true&_bids=true`,
    listing: (id) => BASE_URL + `holidaze/listings/${id}?_seller=true&_bids=true`,
    createEntry: BASE_URL + `holidaze/listings`,
    updateEntry: (id) => BASE_URL + `holidaze/listings/${id}`,
    deleteEntry: (id) => BASE_URL + `holidaze/listings/${id}`,
    makeBid: (id) => BASE_URL + `holidaze/listings/${id}/bids`,
    allProfiles: BASE_URL + `holidaze/profiles?_listings`,
    singleProfile: (name) => BASE_URL + `holidaze/profiles/${name}`,
    singleProfilelistings: (name) => BASE_URL + `holidaze/profiles/${name}/listings?_seller=true&_bids=true`,
    search: BASE_URL + `holidaze/listings?_seller=true&_bids=true`,
  };

  