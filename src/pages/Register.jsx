import { Button, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { auctionUrls } from '../api/Apiutils';
import { Error } from "../components/Error";
import { toast } from "react-toastify";

export function Register() {
  document.title = "Holidaze | Register";
  document.getElementsByTagName('meta')["description"].content = "Register to Holidaze";
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();


  async function sendRegister (userData) {
    const res = await fetch (auctionUrls.register, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    const data = await res.json();
    if(data?.errors) {
      data.errors?.forEach((error)=>{
        toast.warn(error.message);
      });
    } else {
      toast.success("User registered successfully!");      
    } 
  }

  return (
    <>
    <section className="d-flex align-items-center justify-content-center row mt-5">
      <Form
            onSubmit={handleSubmit2(sendRegister)}
            style={{ maxWidth: "600px" }}
            className="border border-1 border-black p-3 rounded-1"
          >
           <h1>Register</h1>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className={errors2.name && "error"}
                type="text"
                placeholder="Username"
                {...register2("name", {
                  required: true,
                  minLength: {
                    value: 3,
                    message: "Username must be more than 3 characters",
                  },
                })}
              />
            <Error text={errors2.name?.message} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className={errors2.email && "error"}
                type="text"
                placeholder="Email"
                {...register2("email", {
                  required: true,
                  pattern: {
                    value: /\S+@stud.noroff.no/,
                    message: "Email must end with @stud.noroff.no",
                  },
                })}
              />
              <Error text={errors2.email?.message} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={errors2.password && "error"}
                type="text"
                placeholder="Password"
                {...register2("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
                  <Error text={errors2.password?.message} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="managerChecked">
              <Form.Label>Register as venueManager</Form.Label>
              <Form.Check 
                type="checkbox"
                {...register2("venueManager")}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Register
              </Button>
            </div>
          </Form>
        </section>
    </>
  )
}