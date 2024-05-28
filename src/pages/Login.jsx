import { Button, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { auctionUrls } from '../api/Apiutils';
import { Error } from "../components/Error";
import { toast } from "react-toastify";


export function Login() {
  document.title = "Holidaze | Login";
  document.getElementsByTagName('meta')["description"].content = "Login to Holidaze";


  //navigation
  const navigate = useNavigate();
  const goToRegister = () => {
    navigate("/register");
  }

  //form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //login function
  async function sendLogin (userData) {
    const res = await fetch (auctionUrls.login, {
      method: "post",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const json = await res?.json();
    const data = json?.data;

    if (!data) {
      json?.errors.forEach((error)=>{
        toast.warn(error.message);
      })
    } else {
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("name", data.name);
      localStorage.setItem("manager", data.venueManager);
      localStorage.setItem("email", data.email)
      navigate("/venues");
    }   
  }


  

  return(
      <section className="d-flex align-items-center justify-content-center row mt-5">
        <Form
          onSubmit={handleSubmit(sendLogin)}
          style={{ maxWidth: "600px" }}
          className="border border-1 border-black p-3 rounded-1"
        >
          <h1>Login</h1>
          <Form.Group className="mb-3" controlId="formMail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className={errors.email && "error"}
              type="text"
              placeholder="Email"
              {...register("email", {
                required: true,
                minLength: {
                  value: 3,
                  message: "Email must be more than 3 characters",
                },
              })}
            />
            <Error text={errors.email?.message} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className={errors.password && "error"}
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 3,
                  message: "Password must be more than 3 characters",
                },
              })}
            />
            <Error text={errors.password?.message} />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Button variant="outline-primary" className="fw-medium" onClick={goToRegister}>
              Register as new user
            </Button>
          </div>
        </Form>
      </section>
    )
}

