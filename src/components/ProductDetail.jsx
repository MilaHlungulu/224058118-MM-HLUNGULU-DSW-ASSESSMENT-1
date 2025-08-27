import React, { useState, useEffect } from "react";

function ProductDetail({ productId, goBack }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!productId) return;

    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <button
        onClick={goBack}
        style={{ marginBottom: "20px", cursor: "pointer" }}
      >
        ← Back to Products
      </button>
      <div style={{ display: "flex", gap: "20px" }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "300px", objectFit: "contain" }}
        />
        <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p style={{ fontWeight: "bold", fontSize: "18px" }}>${product.price}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
