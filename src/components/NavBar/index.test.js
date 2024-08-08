import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "./index";

// Mock da função useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("NavBar", () => {
  beforeEach(() => {
    localStorage.setItem("token", "fakeToken");
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("renders the NavBar with Home and Logout when token is present", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("does not render NavBar when no token is present", () => {
    localStorage.removeItem("token");

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  test("clears token and navigates to /login on logout", () => {
    const navigateMock = jest.fn();
    const { useNavigate } = require("react-router-dom");
    useNavigate.mockReturnValue(navigateMock);

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Logout"));

    expect(localStorage.getItem("token")).toBeNull();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});
