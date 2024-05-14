import { Button, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { auctionUrls } from '../api/Apiutils';


export function Login() {
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
  const sendLogin = async function(userData) {
    const res = await fetch (auctionUrls.login, {
      method: "post",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const response = await res?.json();
    const data = response?.data;

    if (data) {
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("name", data.name);
      localStorage.setItem("manager", data.venueManager);

      navigate("/venues");
    } else {
      //do error stuff
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
              className={errors.Email && "error"}
              type="text"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: {
                  value: 3,
                  message: "Email must be more than 3 characters",
                },
              })}
            />
            <p>{errors.Email?.message}</p>
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
            <p>{errors.password?.message}</p>
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Button variant="outline-primary" onClick={goToRegister}>
              Register as new user
            </Button>
          </div>
        </Form>
      </section>
    )
}

