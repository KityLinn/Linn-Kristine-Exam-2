
import { auctionUrls } from '../api/Apiutils';
import { Row, Form, Col, Button} from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { Error } from "../components/Error";
import { useEffect } from 'react';



export function Newvenue({editVenue}) {
  document.title = "Holidaze | Create new venue";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(()=>{
    if(typeof editVenue === "object") {
      document.title = "Holidaze | Edit venue";

      setValue("name", editVenue.name);
      setValue("description", editVenue.description);
      if (editVenue.media) {
        setValue("media", [editVenue.media[0]]);
      }
      setValue("price", editVenue.price);
      setValue("maxGuests", editVenue.maxGuests);
      if (editVenue.meta) {
        setValue("meta", editVenue.meta);
      }
      if (editVenue.location) {
        setValue("location", editVenue.location)
      }
    }
  }, [editVenue]);

  const token = localStorage.getItem("token");
  async function createListing (venueData) {
    const res = await fetch(auctionUrls.createVenue, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "46dbf285-76f9-4d79-985d-91ee829f49a2",
      },
      body: JSON.stringify(venueData),
    });
    const data = await res.json();
    if (data.errors) {
      alert(data?.errors[0]?.message);

    } else {
      alert("Venue has been created");
      

    }  
  };

  async function updateVenue(venueData) {
    const res = await fetch(auctionUrls.updateVenue(editVenue.id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "46dbf285-76f9-4d79-985d-91ee829f49a2",
      },
      body: JSON.stringify(venueData),
    });
    const data = await res.json();
    if (data.errors) {
      alert(data?.errors[0]?.message);
    } else {
      alert("Venue has been updated");
    } 
  }

  function sendForm(venueData) {
    if (editVenue) {
      updateVenue(venueData);
    } else {
      createListing(venueData);
    }
  }

  return (
    <>
      <section className="d-flex align-items-center justify-content-center row mt-5">
        <Form
          onSubmit={handleSubmit(sendForm)}
          style={{ maxWidth: "600px" }}
          className="border border-1 border-black p-3 rounded-1"
        >
          <h1>Create a new venue</h1>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              className={errors.name && "error"}
              type="text"
              placeholder="Title"
              {...register("name", {
                required: {
                  value: true,
                  message: "Title is required",
                },
              })}
            />
            <Error text={errors.name?.message} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              className={errors.description && "error"}
              as="textarea"
              rows={4}
              placeholder="Description"
              {...register("description", {
                required: {
                  value: true,
                  message: "Description is required",
                },
              })}
            />
            <Error text={errors.description?.message} />
          </Form.Group>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formImage">
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image url"
                {...register("media[0].url")}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formImagetext">
              <Form.Label>Image text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image text"
                {...register("media[0].alt")}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                className={errors.price && "error"}
                type="number"
                placeholder="Price"
                {...register("price", {
                  valueAsNumber: true,
                  required: {
                    value: true,
                    message: "Price is required",
                  },
                })}
              />
              <Error text={errors.price?.message} />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGuests">
              <Form.Label>Max Number of Guests</Form.Label>
              <Form.Control
                className={errors.maxGuests && "error"}
                type="number"
                placeholder="Guests"
                {...register("maxGuests", {
                  valueAsNumber: true,
                  required: {
                    value: true,
                    message: "Guests is required",
                  },
                })}
              />
              <Error text={errors.maxGuests?.message} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="wifiChecked">
              <Form.Label>Wifi</Form.Label>
              <Form.Check type="checkbox" {...register("meta.wifi")} />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="parkingChecked">
              <Form.Label>Parking</Form.Label>
              <Form.Check type="checkbox" {...register("meta.parking")} />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="breakfastChecked">
              <Form.Label>Breakfast</Form.Label>
              <Form.Check type="checkbox" {...register("meta.breakfast")} />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="petsChecked">
              <Form.Label>Pets</Form.Label>
              <Form.Check type="checkbox" {...register("meta.pets")} />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formAdress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                {...register("location.address")}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                {...register("location.city")}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formCity">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                {...register("location.country")}
              />
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit">
            Create venue
          </Button>
        </Form>
      </section>
    </>
  );
}