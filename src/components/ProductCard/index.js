// src/components/ProductCard.js
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css"; // Importa os estilos para o ProductCard

const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <div className="product-card-actions">
        <Link to={`/products/${product.id}/edit`} className="btn btn-edit">
          Edit
        </Link>
        <button onClick={() => onDelete(product.id)} className="btn btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
