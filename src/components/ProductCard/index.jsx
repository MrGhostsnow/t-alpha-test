import React from "react";
import { Link } from "react-router-dom";
import {
  ContainerCard,
  ProductName,
  Price,
  LinkButtons,
  DeleteButton,
  Description,
  Stock,
  Actions,
} from "./styles";

const ProductCard = ({ product, onDelete }) => {
  const { id, name, description, price, stock } = product;

  return (
    <ContainerCard>
      <ProductName>{name}</ProductName>
      <Description>
        <strong>Description:</strong> {description}
      </Description>
      <Actions>
        <Price>Price: ${price}</Price>
        <Stock>Stock: {stock}</Stock>
      </Actions>
      <LinkButtons>
        <Link
          to={`/products/${id}/edit`}
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
        <DeleteButton onClick={() => onDelete(id)}>Delete</DeleteButton>
      </LinkButtons>
    </ContainerCard>
  );
};

export default ProductCard;
