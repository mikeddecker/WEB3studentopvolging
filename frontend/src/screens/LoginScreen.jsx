import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from 'axios';

import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { appUrl } from "../utils/constants";

const LoginScreen = () => {
  const navigate = useNavigate();

  console.log("useAuthContextFromLoginscreen");
  const { isAuthenticated } = useAuthContext();

  const [login, setLogin] = useState({
    email: "",
    pincode: "",
  });

  const handleChange = (event) => {
    setLogin((prevLogin) => ({
      ...prevLogin,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    // Login versturen naar de server - student
    console.log("klik");
    try {
      //const response = await axios.post(appUrl + "/students/login", login, {withCredentials: true});
      const response = await axios.post(appUrl + "/students/login", login, {withCredentials: true});
      if (response.status === 202) {
        
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="d-flex flex-column flex-fill justify-content-center align-items-center">
      <p>Inloggen</p>
      <Form className="d-flex flex-column justify-content-center">
        <Form.Group className="mb-3" controlId="email">
          <Form.Control
            type="text"
            placeholder="Email"
            name="email"
            value={login.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pincode">
          <Form.Control
            type="password"
            name="pincode"
            placeholder="Pincode"
            onChange={handleChange}
          />
        </Form.Group>
        <Button onClick={handleSubmit}>Inloggen</Button>
      </Form>
    </div>
  );
};

export default LoginScreen;
