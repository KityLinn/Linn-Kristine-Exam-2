import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auctionUrls } from '../api/Apiutils';
import { Row, Form, Col, Button} from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";


export function Newvenue() {
  document.title = "Holidaze | Create new venue";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const token = localStorage.getItem("token");
  async function creaListing (venueData) {
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
    console.log(data);
  };

function testListing (data) {
  console.log(data)
}

  return (
    <>
      <section className="d-flex align-items-center justify-content-center row mt-5">
        <Form
          onSubmit={handleSubmit(testListing)}
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
            <p>{errors.name?.message}</p>
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
            <p>{errors.description?.message}</p>
          </Form.Group>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formImage">
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image url"
                {...register("media.url")}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formImagetext">
              <Form.Label>Image text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image text"
                {...register("media.alt")}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
              className={errors.price && "error"}
              type="number"
              placeholder="Title"
              {...register("price", {
                required: {
                  value: true,
                  message: "Price is required",
                },
              })}
            />
            <p>{errors.price?.message}</p>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="formGuests">
              <Form.Label>Max Number of Guests</Form.Label>
              <Form.Control
              className={errors.maxGuests && "error"}
              type="number"
              placeholder="Guests"
              {...register("maxGuests", {
                required: {
                  value: true,
                  message: "Guests is required",
                },
              })}
            />
            <p>{errors.maxGuests?.message}</p>
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