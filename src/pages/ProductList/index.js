import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token"); // Obtém o token do localStorage

    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    const options = {
      method: "GET",
      url: "https://interview.t-alpha.com.br/api/products/get-all-products",
      headers: {
        Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
      },
    };

    try {
      const { data } = await axios.request(options);
      console.log("Fetched products:", data);
      setProducts(data.data.products); // Ajuste conforme o formato real dos dados
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    const options = {
      method: "DELETE",
      url: `https://interview.t-alpha.com.br/api/products/delete-product/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.request(options);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error(
        "Error deleting product:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to delete the product.");
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <Link to="/products/new">Add New Product</Link>
      <ul>
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
