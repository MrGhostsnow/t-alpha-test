import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/products" : "/login"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/products"
          element={token ? <ProductList /> : <Navigate to="/login" />}
        />
        <Route
          path="/products/new"
          element={token ? <ProductForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/products/:id/edit"
          element={token ? <ProductForm /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
