import React, { useState, useEffect } from "react";
import ProductDetail from "./components/ProductDetail";

function App() {
  const [products, setProducts] = useState([]);
  const [currentView, setCurrentView] = useState("list"); 
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const handleProductClick = (id) => {
    setSelectedProductId(id);
    setCurrentView("detail");
  };

  const handleBack = () => {
    setCurrentView("list");
    setSelectedProductId(null);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {currentView === "list" ? (
        <ProductList products={products} onProductClick={handleProductClick} />
      ) : (
        <ProductDetail productId={selectedProductId} goBack={handleBack} />
      )}
    </div>
  );
}

function ProductList({ products, onProductClick }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product.id)}
        />
      ))}
    </div>
  );
}

function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        cursor: "pointer",
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "100%", height: "150px", objectFit: "contain" }}
      />
      <h3 style={{ fontSize: "16px" }}>{product.title}</h3>
      <p style={{ fontWeight: "bold" }}>${product.price}</p>
    </div>
  );
}

export default App; 
