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
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const { data } = await api.get(`/api/products/get-one-product/${id}`);
          const { name, description, price, stock } = data.data.product;
          setProductName(name);
          setProductDescription(description);
          setProductPrice(price.toString());
          setProductStock(stock.toString());
        } catch (error) {
          setErrorMessage("Error fetching product details.");
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const productData = {
      name: productName,
      price: parseFloat(productPrice),
      description: productDescription,
      stock: parseInt(productStock, 10),
    };

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No token found. Please log in.");
      return;
    }

    const requestOptions = {
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
      const { data } = await axios.request(requestOptions);
      console.log("Product saved:", data);
      navigate("/products");
    } catch (error) {
      const errorMessageFromResponse =
        error.response && error.response.data && error.response.data.message;
      setErrorMessage(
        errorMessageFromResponse || "Failed to save the product."
      );
    }
  };

  return (
    <ContainerPage>
      <ContainerProductForm>
        <TitlePage>{id ? "Edit Product" : "New Product"}</TitlePage>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <FormProduct onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Name"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
          />
          <Input
            type="text"
            placeholder="Description"
            value={productDescription}
            onChange={(event) => setProductDescription(event.target.value)}
          />
          <Input
            type="number"
            placeholder="Price"
            value={productPrice}
            onChange={(event) => setProductPrice(event.target.value)}
          />
          <Input
            type="number"
            placeholder="Stock"
            value={productStock}
            onChange={(event) => setProductStock(event.target.value)}
          />
          <ButtonCreate type="submit">{id ? "Update" : "Create"}</ButtonCreate>
        </FormProduct>
      </ContainerProductForm>
    </ContainerPage>
  );
}

export default ProductForm;
