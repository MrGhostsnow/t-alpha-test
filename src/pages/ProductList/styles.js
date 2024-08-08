import styled from "styled-components";

export const ContainerPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  margin-bottom: 80px;
`;

export const ContainerProductList = styled.div`
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

export const TitlePage = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

export const SectionListProducts = styled.section`
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
