import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { ContainerPage, ContainerList, Title, ProductList } from "./styles";

function ProductListPage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    const options = {
      method: "GET",
      url: "https://interview.t-alpha.com.br/api/products/get-all-products",
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const { data } = await axios.request(options);
      setProducts(data.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const deleteOptions = {
      method: "DELETE",
      url: `https://interview.t-alpha.com.br/api/products/delete-product/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      await axios.request(deleteOptions);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete the product.");
    }
  };

  return (
    <ContainerPage>
      <ContainerList>
        <Title>Product List</Title>
        <Link
          to="/products/new"
          style={{ textDecoration: "none", color: "blue", marginBottom: 20 }}
        >
          Add New Product
        </Link>
        <ProductList>
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
            />
          ))}
        </ProductList>
      </ContainerList>
    </ContainerPage>
  );
}

export default ProductListPage;
