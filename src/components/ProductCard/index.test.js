import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./index";
import { BrowserRouter as Router } from "react-router-dom"; // Necessário para o Link funcionar

// Mock da função onDelete
const mockOnDelete = jest.fn();

const product = {
  id: 1,
  name: "Sample Product",
  description: "This is a product description.",
  price: 99.99,
  stock: 10,
};

describe("ProductCard Component", () => {
  test("renders product details", () => {
    render(
      <Router>
        <ProductCard product={product} onDelete={mockOnDelete} />
      </Router>
    );

    // Verifica se o nome do produto está presente
    expect(screen.getByText(/Sample Product/i)).toBeInTheDocument();

    // Verifica se a descrição do produto está presente
    expect(
      screen.getByText(/This is a product description./i)
    ).toBeInTheDocument();

    // Verifica se o preço do produto está presente usando uma função de correspondência
    expect(screen.getByText(/Price: \$99.99/i)).toBeInTheDocument();

    // Verifica se o estoque do produto está presente
    expect(screen.getByText(/Stock: 10/i)).toBeInTheDocument();
  });

  test("renders Edit button with correct link", () => {
    render(
      <Router>
        <ProductCard product={product} onDelete={mockOnDelete} />
      </Router>
    );

    const editLink = screen.getByText(/Edit/i);
    expect(editLink).toBeInTheDocument();
    expect(editLink.getAttribute("href")).toBe("/products/1/edit");
  });

  test("calls onDelete when Delete button is clicked", () => {
    render(
      <Router>
        <ProductCard product={product} onDelete={mockOnDelete} />
      </Router>
    );

    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
