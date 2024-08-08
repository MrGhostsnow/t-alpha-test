import styled from "styled-components";

export const ContainerPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  margin-bottom: 80px;
`;

export const ContainerList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
`;

export const SectionTitle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

export const AddNewProductLink = styled.a`
  text-decoration: none;
  color: blue;
  cursor: pointer;
  margin-bottom: 1rem;
`;

export const ProductList = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  border: 1px solid #ccc;

  @media (max-width: 1440px) {
    justify-content: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
