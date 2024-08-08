import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../services/api";
import {
  ContainerPage,
  ContainerProductForm,
  TitlePage,
  FormProduct,
  Input,
  ButtonCreate,
  ErrorMessage,
} from "./styles";

function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState(""); // Estado para mensagens de erro
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await api.get(`/api/products/get-one-product/${id}`);
          setName(response.data.data.product.name || "");
          setPrice(response.data.data.product.price || "");
          setDescription(response.data.data.product.description || "");
          setStock(response.data.data.product.stock || "");
        } catch (error) {
          setError("Error fetching product details.");
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: name,
      price: parseFloat(price),
      description: description,
      stock: parseInt(stock, 10),
    };

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

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
      navigate("/products");
    } catch (error) {
      setError(
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Failed to save the product."
      );
    }
  };

  return (
    <ContainerPage>
      <ContainerProductForm>
        <TitlePage>{id ? "Edit Product" : "New Product"}</TitlePage>
        {error && <ErrorMessage>{error}</ErrorMessage>}{" "}
        {/* Exibe mensagem de erro */}
        <FormProduct onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <ButtonCreate type="submit">{id ? "Update" : "Create"}</ButtonCreate>
        </FormProduct>
      </ContainerProductForm>
    </ContainerPage>
  );
}

export default ProductForm;
