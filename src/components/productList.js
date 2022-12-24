import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  // const [productsCount, setProductCount] = useState(0);

  useEffect(() => {
    getProducts();

    const cartInSession = sessionStorage.getItem("cart");
    if (cartInSession) setCart(JSON.parse(cartInSession));
    const showCartInSession = sessionStorage.getItem("showCart");
    setShowCart(Boolean(JSON.parse(showCartInSession)));


  }, []);

  function getProducts() {
    // axios.get("https://randomuser.me/api").then(function (response) {
    // axios.get("https://fakestoreapi.com/products").then(function (response) {
    axios.get("https://fakestoreapi.com/products?limit=10").then(function (response) {
      console.log(response.data);
      setProducts(response.data);
    });
  }

  const isAdded = (product) => {
    const index = cart.findIndex(({ id }) => id === product.id);
    return index > -1;
  };

  const handleAdd = (product) => {
    if (isAdded(product)) return;

    const newCart = [...cart];
    newCart.push(product);
    setCart(newCart);
    sessionStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleRemove = (product) => {
    let newCart = [...cart];
    newCart = newCart.filter(({ id }) => id !== product.id);
    setCart(newCart);
    sessionStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <>
      <br />
      <div className="container-fluid">
        <h3 style={{ textAlign: "right" }}>
          Cart Item:&ensp;
          <b>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => {
                setShowCart(!showCart)
                sessionStorage.setItem("showCart", JSON.stringify(!showCart));
              }}
            >
              {cart.length}
            </button>
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
                {showCart ? <th scope="col">Remove item</th> : <th scope="col">Add item</th>}
              </tr>
            </thead>
            <tbody>
              {(showCart ? cart : products).map((product, key) => (
                <tr key={key}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>
                    <img src={product.image} width="70px" height="70px" />
                  </td>
                  <td>{product.rating.rate}</td>
                  {showCart ? (
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleRemove(product)}
                      >
                        Remove
                      </button>
                    </td>
                  ) : (
                    <td>
                      <button
                        disabled={isAdded(product)}
                        className="btn btn-sm btn-primary"
                        onClick={() => handleAdd(product)}
                      >
                        Add
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {showCart && (
            <div style={{ textAlign: "right" }}>
              <button className="btn btn-sm btn-success">Buy Now</button>
              <br />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
