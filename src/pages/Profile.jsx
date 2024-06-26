import { Button,  Modal, Col, Row, Form, } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auctionUrls } from '../api/Apiutils';
import { useForm } from 'react-hook-form';
import { ProfileVenue } from "../components/Profilevenue";
import { Profilebookings } from "../components/Profilebookings";
import { toast } from "react-toastify";


export function Profile() {
  const token = localStorage.getItem("token");
  const { name } = useParams();
  document.title = `Holidaze | ${name} profile`;
  const [profile, setProfile] = useState([]);

  document.getElementsByTagName('meta')["description"].content = `${name}s Holidaze profile`;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function getProfile() {
    const response = await fetch(auctionUrls.singleProfile(name), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "46dbf285-76f9-4d79-985d-91ee829f49a2",
      },
    });
    const res = await response.json();
    const data = res.data;
    setProfile(data);
  }

  async function modifyUser(editData) {
    const res = await fetch(auctionUrls.editProfile(name), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "46dbf285-76f9-4d79-985d-91ee829f49a2",
      },
      body: JSON.stringify(editData),
    });
    const json = await res?.json();
    const data = json?.data;
    if (!data) {
      json.errors?.forEach((error)=>{
        toast.warn(error.message);
      });
    } else {
      toast.success(`User modified!
      refresh the page for changes to occur`);      
    } 
  }

  async function deleteBooking (id) {
    const res = await fetch(auctionUrls.deleteBooking(id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "46dbf285-76f9-4d79-985d-91ee829f49a2",
      },
    });
    toast.success(`Booking cancelled!
    refresh the page for changes to occur`); 
  }



  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <section className="d-flex align-items-center justify-content-center row mt-5">
        <div
          style={{ maxWidth: "600px" }}
          className="border border-1 border-black p-3 rounded-1 d-flex justify-content-center flex-column"
        >
          <h1 className="text-center">{profile.name}</h1>
          <img
            className="d-block w-100"
            src={profile.avatar?.url}
           alt={profile.avatar?.alt ? profile.avatar.alt : profile.name}
            style={{
              objectFit: "cover",
              maxWidth: "600px",
              height: "400px",
            }}
          />
          <div className="d-block mx-auto">
            <Button
              className="mt-5 btn btn-primary object-fit-contain"
              onClick={handleShow}
            >
              Change profile
            </Button>
          </div>
        </div>
      </section>
      {profile.bookings?.length > 0 && (
        <section className="d-flex align-items-center justify-content-center row mt-5">
          <Row style={{ maxWidth: "800px" }}>
            <Row>
              <h2>Your Bookings</h2>
            </Row>
            <Row xs={2} md={3} lg={4} className="g-3 ">
              {profile.bookings.map((b) => {
                return (
                  <Col  key={b.id}>
                    <Profilebookings {...b} deleteFunc={deleteBooking}/>
                  </Col>
                );
              })}
            </Row>
          </Row>
        </section>
      )}
      {profile.venues?.length > 0 && (
        <section className="d-flex align-items-center justify-content-center row mt-5">
          <Row style={{ maxWidth: "800px" }}>
            <Row>
              <h2>Your Venues</h2>
            </Row>
              <Row xs={1} md={2} className="g-3">
                {profile.venues.map((v) => {
                  return (
                    <Col key={v.id}>
                      <ProfileVenue {...v} />
                    </Col>
                  );
                })}
              </Row>
          </Row>
        </section>
      )}
      <Modal show={show} onHide={handleClose} animation={true} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Change profile image</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit(modifyUser)}
            style={{ maxWidth: "600px" }}
            className="border border-1 border-black p-3 rounded-1"
          >
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Control
                className={errors.image && "error"}
                type="text"
                placeholder="image"
                {...register("avatar.url", {
                  required: {
                    value: true,
                    message: "image is required",
                  },
                })}
              />
              <p>{errors.image?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImtext">
              <Form.Control
                className={errors.alt && "error"}
                type="text"
                placeholder="Image description"
                {...register("avatar.alt", {
                  required: {
                    value: true,
                    message: "image text is required",
                  },
                })}
              />
              <p>{errors.alt?.message}</p>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Submit changes
              </Button>
              <Button variant="outline-primary" onClick={handleClose}>
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}