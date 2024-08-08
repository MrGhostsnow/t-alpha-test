import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledNavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  border-bottom: 1px solid #ccc;
  background-color: #f8f9fa;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-right: 15px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-weight: bold;

  &:hover {
    color: #0056b3;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-weight: bold;
  cursor: pointer;
  margin-left: 15px;

  &:hover {
    color: #0056b3;
  }
`;

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <StyledNavBar>
      {token && (
        <NavList>
          <NavItem>
            <NavLink to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </NavItem>
        </NavList>
      )}
    </StyledNavBar>
  );
}

export default NavBar;
