import React, { useContext, useEffect, useState } from "react";
import DataContext from "../Context/DataContext";
import { BiMinus, BiPlus } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cakes, api, cart, setCart } = useContext(DataContext);
  const [selectedItem, setSelectedItem] = useState("");
  const [total, setTotal] = useState(0);
  const [finalTotal, setfinalTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart?.length < 1) return;
    const totalArray = cart.map((item) => item?.price * item.details.quantity);
    setTotal(totalArray.reduce((totalPrice, price) => (totalPrice += price)));
    setfinalTotal(
      totalArray.reduce((totalPrice, price) => (totalPrice += price)) + 10
    );
  }, [cart]);

  function changeQuantityWithInput(e, name) {
    const selectedCartItem = cart.find((item) => item.name === name);
    if (e.target.value === "") {
      selectedCartItem.quantity = 1;
    } else {
      selectedCartItem.quantity = parseInt(e.target.value);
    }
    selectedItem.price *= selectedCartItem.quantity;
    const newCart = cart.map((item) =>
      item.name === name ? selectedCartItem : item
    );
    return setCart(newCart);
  }

  async function minusOneToItemQuantity(id) {
    const selectedCartItem = cart.find((item) => item.id === id);
    if (selectedCartItem?.details.quantity < 2) {
      selectedCartItem.details.quantity = 1;
    } else {
      selectedCartItem.details.quantity -= 1;
    }
    const newCart = cart.map((item) =>
      item._id === id ? selectedCartItem : item
    );
    localStorage.setItem("cart", JSON.stringify(newCart));
    return setCart(newCart);
  }

  async function addOneToItemQuantity(id) {
    const selectedCartItem = cart.find((item) => item.id === id);
    if (selectedCartItem?.details.quantity > 25) {
      selectedCartItem.details.quantity = 25;
    } else {
      selectedCartItem.details.quantity += 1;
    }
    const newCart = cart.map((item) =>
      item.id === id ? selectedCartItem : item
    );
    localStorage.setItem("cart", JSON.stringify(newCart));
    return setCart(newCart);
  }

  async function handleDelete(id) {
    if (!id) return console.log("No id");
    const newCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    return setCart(newCart);
  }

  return (
    <>
      {cart.length > 0 && (
        <div className="cart-container">
          <div className="corner-button">
            <button onClick={() => navigate(-1)}>Back</button>
          </div>
          <br />
          <section className="cart-details-container">
            <table className="cart-table" style={{ overflow: "auto" }}>
              <thead>
                <tr className="small-table">
                  <th>Details</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>

                <tr className="normal-table">
                  <th>Product</th>
                  <th>Details</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="cart-item">
                    <td>
                      <h3 className="product-name">{item.name}</h3>

                      <img src={item.image} alt="cake" />
                    </td>

                    <td className="cart-details">
                      <p className="delete-cart-item-container">
                        <AiFillDelete
                          className="delete-cart-item-icon"
                          onClick={() => handleDelete(item.id)}
                        />
                      </p>

                      <h3
                        className="small-table-name"
                        style={{
                          width: "max-content",
                          margin: "0 auto",
                          marginBottom: "5px",
                          borderBottom: "2px solid black",
                        }}
                      >
                        <span style={{ textTransform: "capitalize" }}>
                          {item.name}
                        </span>
                      </h3>

                      <p>
                        <span style={{ fontWeight: "bolder" }}>Size:</span>{" "}
                        {item.details.size}
                      </p>

                      <p>
                        <span style={{ fontWeight: "bolder" }}>Sponge:</span>{" "}
                        {item.details.sponge}
                      </p>

                      <p>
                        <span style={{ fontWeight: "bolder" }}>Filling:</span>{" "}
                        {item.details.filling}
                      </p>

                      <p>
                        <span style={{ fontWeight: "bolder" }}>Toppping:</span>{" "}
                        {item.details.topping}
                      </p>

                      <p>
                        <span style={{ fontWeight: "bolder" }}>
                          Additional Info:
                        </span>{" "}
                        {item.details.additionalInfo}
                      </p>

                      <p>
                        <span style={{ fontWeight: "bolder" }}>Price:</span> R
                        {item.price * item.details.quantity}
                      </p>

                      <button className="cart-changeEdit-btn">
                        <Link
                          to={`/cart/edit/${item.id}`}
                          style={{
                            fontStyle: "italic",
                          }}
                        >
                          Edit Options
                        </Link>
                      </button>
                    </td>

                    <td className="cart-quantity">
                      <div
                        className="cart-minus"
                        onClick={() => minusOneToItemQuantity(item.id)}
                      >
                        <BiMinus />
                      </div>

                      <input
                        className="cart-quantity"
                        type="Number"
                        name="cart-quantity"
                        id=""
                        title="quantity"
                        value={item.details.quantity}
                        onChange={(e) => changeQuantityWithInput(e, item.name)}
                      />

                      <div
                        className="cart-plus"
                        onClick={() => addOneToItemQuantity(item.id)}
                      >
                        <BiPlus />
                      </div>
                    </td>

                    <td>
                      <p>R{(item.price * item.details.quantity).toFixed(2)}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="total-container">
              <p>Total Cart Prices</p>

              <p className="sub-total-label">SUBTOTAL</p>
              <p className="sub-total-price">R{total.toFixed(2)}</p>

              <p className="final-total-label">FINAL TOTAL</p>
              <p className="final-total-price">R{finalTotal.toFixed(2)}</p>

              <div className="totals-info">
                <p>
                  <strong>Sub Total</strong> = total price of all products
                </p>

                <p>
                  <strong>Final Total</strong> = total price of all products +
                  shipping cost + delivery fees + tax on fees
                </p>

                <p className="check-out-btn-container">
                  <button className="check-out-btn">
                    <Link to="/cart/checkout">Checkout</Link>
                  </button>
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {cart.length === 0 && (
        <>
          <div className="corner-button">
            <button onClick={() => navigate("/")}>Back</button>
          </div>
          <p
            style={{ height: "100vh", display: "grid", placeContent: "center" }}
          >
            Cart currently empty
          </p>
        </>
      )}
    </>
  );
};

export default Cart;
