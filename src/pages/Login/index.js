import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [taxNumber, setTaxNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      url: "https://interview.t-alpha.com.br/api/auth/login",
      headers: { "Content-Type": "application/json" },
      data: { taxNumber, password },
    };

    try {
      const { data } = await axios.request(options);
      console.log("API response data:", data); // Verifique a estrutura da resposta
      const token = data.data.token; // Acesse o token corretamente
      if (token) {
        localStorage.setItem("token", token);
        console.log("Token stored:", localStorage.getItem("token")); // Armazenando o token
        window.location.href = "/products"; // Redirecionando para a página de produtos
      } else {
        throw new Error("Token not found in the response");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Login failed: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="CPF ou CNPJ do usuário"
          value={taxNumber}
          onChange={(e) => setTaxNumber(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
