import styled from "styled-components";

export const ContainerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 30%;
  height: 280px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const ProductName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

export const Actions = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  margin-bottom: 1rem;
  gap: 1rem;
`;

export const Price = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const Stock = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const LinkButtons = styled.div`
  text-decoration: none;
  color: #007bff; /* Cor dos links */
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 1rem;
`;

export const DeleteButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
`;
