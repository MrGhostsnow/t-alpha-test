import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  ButtonRegister,
  ContainerRegister,
  FormRegister,
  Input,
  TitlePage,
  ErrorMessage,
} from "./styles";
import { ContainerPage } from "../ProductList/styles";

function Register() {
  const [name, setName] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!name) {
      errors.name = "name is required.";
    }
    if (!taxNumber) {
      errors.taxNumber = "user ID is required.";
    }
    if (!mail) {
      errors.mail = "e-mail is required.";
    } else if (!/\S+@\S+\.\S+/.test(mail)) {
      errors.mail = "e-mail is invalid.";
    }
    if (!phone) {
      errors.phone = "phone is required.";
    }
    if (!password) {
      errors.password = "password is required.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const options = {
      method: "POST",
      url: "https://interview.t-alpha.com.br/api/auth/register",
      headers: { "Content-Type": "application/json" },
      data: { name, taxNumber, mail, phone, password },
    };

    try {
      await axios.request(options);
      navigate("/login");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data : error.message
      );
      setErrors({
        submit: error.response
          ? error.response.data.message
          : "Failed when trying to register.",
      });
    }
  };

  return (
    <ContainerPage>
      <ContainerRegister>
        <TitlePage>Register</TitlePage>
        <FormRegister onSubmit={handleSubmit}>
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.taxNumber && <ErrorMessage>{errors.taxNumber}</ErrorMessage>}
          <Input
            placeholder="User ID"
            value={taxNumber}
            onChange={(e) => setTaxNumber(e.target.value)}
          />
          {errors.mail && <ErrorMessage>{errors.mail}</ErrorMessage>}
          <Input
            type="email"
            placeholder="Email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          <Input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <ButtonRegister type="submit">Register</ButtonRegister>
          {errors.submit && (
            <ErrorMessage style={{ marginTop: 10 }}>
              {errors.submit}
            </ErrorMessage>
          )}
        </FormRegister>
        <Link to="/login" style={{ color: "#007bff" }}>
          Alredy registered?
        </Link>
      </ContainerRegister>
    </ContainerPage>
  );
}

export default Register;
