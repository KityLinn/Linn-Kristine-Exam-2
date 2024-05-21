import { Container, Button, Offcanvas, Modal, Col, Row, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auctionUrls } from '../api/Apiutils';
import { useForm } from 'react-hook-form';


export function Profile() {

  // modal state and func
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function modifyUser (editData) {
    console.log(editData)
    const token = localStorage.getItem("token");
    const response = await fetch(auctionUrls.editProfile(name), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "46dbf285-76f9-4d79-985d-91ee829f49a2"
      },
      body: JSON.stringify(editData),
    });
      const res = await response.json();
      console.log(res)

  }
    const { name } = useParams();
    document.title = `Holidaze | ${name} profile`;
    const [profile, setProfile] = useState([]);
    auctionUrls.singleProfile(name)
    async function getProfile() {
      const token = localStorage.getItem("token");
      const response = await fetch(auctionUrls.singleProfile(name), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": "46dbf285-76f9-4d79-985d-91ee829f49a2"
        },
      });
        const res = await response.json();
        const data = res.data
        setProfile(data)
        console.log(data)
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
              alt={profile.avatar?.alt}
              style={{
                objectFit: "cover",
                maxWidth: "600px",
                height: "400px",
              }}
            />
            <Button className="mt-5 btn btn-primary object-fit-contain" onClick={handleShow}>Change profile</Button>
          </div>
        </section>
        <Modal show={show} onHide={handleClose} animation={true} centered>
        <Modal.Header closeButton>
          <Modal.Title><h2>Change profile image</h2></Modal.Title>
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
                    value:true,
                    message: "image is required"
                  }
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
                    value:true,
                    message: "image text is required"
                  }
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
        <Modal.Footer></Modal.Footer>
      </Modal>
      </>
    );
 }