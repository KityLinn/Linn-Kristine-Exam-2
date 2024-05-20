const BASE_URL = "https://v2.api.noroff.dev/";

export const auctionUrls = {
    login: BASE_URL + "auth/login?_holidaze=true",
    register: BASE_URL + "auth/register",
    API_key: BASE_URL + "auth/create-api-key",
    venues: (amount, number) => BASE_URL + `holidaze/venues?limit=${amount}&page=${number}&_owner=true&_bookings=true`,
    singleVenue: (id) => BASE_URL + `holidaze/venues/${id}?_owner=true&_bookings=true`,
    createVenue: BASE_URL + `holidaze/venues`,
    updateVenue: (id) => BASE_URL + `holidaze/venues/${id}`,
    deleteVenue: (id) => BASE_URL + `holidaze/venues/${id}`,
    searchVenue: (query) => BASE_URL + `holidaze/venues/search?q=${query}`,
    allProfiles: BASE_URL + `holidaze/profiles?_bookings=true&_venues=true`,
    singleProfile: (name) => BASE_URL + `holidaze/profiles/${name}?_bookings=true&_venues=true`,
    editProfile: (name) => BASE_URL + `holidaze/profiles/${name}`,
    searchProfiles: (query) => BASE_URL + `holidaze/profiles/search?q=${query}`,
    allBookings: BASE_URL + `holidaze/bookings?_customer=true&_venue=true`,
    singleBooking: (id) => BASE_URL + `holidaze/bookings/${id}?_customer=true&_venue=true`,
    createBooking: BASE_URL + `holidaze/bookings`,
    updateBooking: (id) => BASE_URL + `holidaze/bookings/${id}`,
    deleteBooking: (id) => BASE_URL + `holidaze/bookings/${id}`
  };

  