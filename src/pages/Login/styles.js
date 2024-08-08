import styled from "styled-components";

export const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  border: 1px solid #ccc;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  @media (max-width: 425px) {
    width: 300px;
  }
`;

export const TitlePage = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

export const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 1rem;
`;

export const ButtonLogin = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 30%;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin: 0;
  width: 100%;
`;
