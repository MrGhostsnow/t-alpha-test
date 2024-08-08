import React, { useState } from "react";
import axios from "axios";
import {
  ContainerLogin,
  TitlePage,
  FormLogin,
  Input,
  ButtonLogin,
  ErrorMessage,
} from "./styles";
import { ContainerPage } from "../ProductList/styles";
import { Link } from "react-router-dom";

function Login() {
  const [taxNumber, setTaxNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!taxNumber) {
      errors.taxNumber = "user ID is required.";
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
      url: "https://interview.t-alpha.com.br/api/auth/login",
      headers: { "Content-Type": "application/json" },
      data: { taxNumber, password },
    };

    try {
      const { data } = await axios.request(options);
      const token = data.data.token;

      if (token) {
        localStorage.setItem("token", token);
        window.location.href = "/products";
      } else {
        throw new Error("Token não encontrado na resposta.");
      }
    } catch (error) {
      console.error(
        "Falha no login:",
        error.response ? error.response.data : error.message
      );
      setErrors({
        submit: error.response
          ? error.response.data.message
          : "Falha ao tentar realizar o login.",
      });
    }
  };

  return (
    <ContainerPage>
      <ContainerLogin>
        <TitlePage>Login</TitlePage>
        <FormLogin onSubmit={handleSubmit}>
          {errors.taxNumber && <ErrorMessage>{errors.taxNumber}</ErrorMessage>}
          <Input
            placeholder="CPF ou CNPJ do usuário"
            value={taxNumber}
            onChange={(e) => setTaxNumber(e.target.value)}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.submit && (
            <ErrorMessage style={{ marginBottom: "20px" }}>
              {errors.submit}
            </ErrorMessage>
          )}
          <ButtonLogin type="submit">Login</ButtonLogin>
        </FormLogin>
        <Link to="/register" style={{ color: "#007bff" }}>
          Not registered? Click here
        </Link>
      </ContainerLogin>
    </ContainerPage>
  );
}

export default Login;
