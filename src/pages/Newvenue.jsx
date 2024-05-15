import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auctionUrls } from '../api/Apiutils';
import { Row, Form, Col } from "react-bootstrap";
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
        <section className="d-flex align-items-center justify-content-center row mt-5">
        <Form
          onSubmit={handleSubmit()}
          style={{ maxWidth: "600px" }}
          className="border border-1 border-black p-3 rounded-1"
        >
          <h1>Create a new venue</h1>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              className={errors.Title && "error"}
              type="text"
              placeholder="Title"
              {...register("name", {
                required: true,
                message: "Title is required",
              })}
            />
            <p>{errors.Title?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              className={errors.description && "error"}
              as="textarea"
              rows={4}
              placeholder="Description"
              {...register("description", {
                required: true,
                message: "Description is required"
              })}
            />
            <p>{errors.description?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              className={errors.Price && "error"}
              type="number"
              placeholder="Price"
              {...register("price", {
                required: true,
                message: "price is required",
              })}
            />
            <p>{errors.Price?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGuests">
            <Form.Label>Number of Guests</Form.Label>
            <Form.Control
              className={errors.Guests && "error"}
              type="number"
              placeholder="Guests"
              {...register("guests", {
                required: true,
                message: "Guests is required",
              })}
            />
            <p>{errors.Guests?.message}</p>
          </Form.Group>

        </Form>
      </section>
        
        </>
     )
        


}