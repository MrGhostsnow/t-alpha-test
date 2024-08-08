import React from "react";
import { Link } from "react-router-dom";
import {
  ContainerCard,
  ProductName,
  Price,
  LinkButtons,
  ButtonDelete,
  ProductDescription,
  ProductStock,
  SectionNumbers,
} from "./styles";

const ProductCard = ({ product, onDelete }) => {
  return (
    <ContainerCard>
      <ProductName>{product.name}</ProductName>
      <ProductDescription>
        <strong>Description</strong>: {product.description}
      </ProductDescription>
      <SectionNumbers>
        <Price>
          <strong>Price</strong>: ${product.price}
        </Price>
        <ProductStock>
          <strong>Stock</strong>: {product.stock}
        </ProductStock>
      </SectionNumbers>
      <LinkButtons>
        <Link
          to={`/products/${product.id}/edit`}
          className="btn btn-edit"
          style={{
            backgroundColor: "green",
            color: "white",
            width: "70px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          Edit
        </Link>
        <ButtonDelete onClick={() => onDelete(product.id)}>Delete</ButtonDelete>
      </LinkButtons>
    </ContainerCard>
  );
};

export default ProductCard;
