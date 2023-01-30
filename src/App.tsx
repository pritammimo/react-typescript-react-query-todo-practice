import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import ProductsList from './components/ProductslList';
import AddProduct from './components/AddProduct';
import Product from './components/Product';

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/products" className="navbar-brand">
          Pritam Coder
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/products"} className="nav-link">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<ProductsList/>} />
          <Route path="/products" element={<ProductsList/>} />
          <Route path="/add" element={<AddProduct/>} />
          <Route path="/product/:id" element={<Product/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
