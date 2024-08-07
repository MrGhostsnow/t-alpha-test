import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../services/api";

function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await api.get(`/api/products/get-one-product/${id}`);
          // console.log("Product data:", response.data);

          setName(response.data.data.product.name || "");
          setPrice(response.data.data.product.price || "");
          setDescription(response.data.data.product.description || "");
          setStock(response.data.data.product.stock || "");
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: name,
      price: parseFloat(price), // Converte para número decimal
      description: description,
      stock: parseInt(stock, 10), // Converte para número inteiro
    };

    // Obtém o token de autenticação
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    // Configurações da solicitação
    const options = {
      method: id ? "PATCH" : "POST",
      url: id
        ? `https://interview.t-alpha.com.br/api/products/update-product/${id}`
        : "https://interview.t-alpha.com.br/api/products/create-product",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(productData),
    };

    try {
      const response = await axios.request(options);
      console.log("Product saved:", response.data);
      console.log(options.data);
      // Redireciona para a página de produtos
      navigate("/products");
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to save the product.");
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Product" : "New Product"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button type="submit">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default ProductForm;
