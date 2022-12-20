import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  });

  function getProducts() {
    axios.get("https://fakestoreapi.com/products").then(function (response) {
      console.log(response.data);
      setProducts(response.data);
    });
  }

  return (
    <>
      <br />
      <div className="container-fluid">
        <h3 style={{ textAlign: "right" }}>
          Item Added:&ensp;
          <b>
            <button className="btn btn-sm btn-primary">10</button>
          </b>
        </h3>
        <h2>Product Lists</h2>
        <div className="over-flow">
          <table className="table table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Image</th>
                <th scope="col">Rating</th>
                <th scope="col">Add item</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, key) => (
                <tr key={key}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>{product.image}</td>
                  <td>{product.rating.rate}</td>
                  <td>
                    <button className="btn btn-sm btn-primary">Add</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductList;
