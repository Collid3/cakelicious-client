import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CakePageContext from "../Context/CakePageContext";
import DataContext from "../Context/DataContext";
import AdditionalInfo from "../components/cakePage/AdditionalInfo";
import FillingSelection from "../components/cakePage/FillingSelection";
import QuantitySelection from "../components/cakePage/QuantitySelection";
import SizeSelection from "../components/cakePage/SizeSelection";
import SpongeSelection from "../components/cakePage/SpongeSelection";
import ToppingSelection from "../components/cakePage/ToppingSelection";

const EditCartItem = () => {
  const { cart, navigate, setCart, cakes } = useContext(DataContext);
  const { values } = useContext(CakePageContext);

  const { id } = useParams();
  const [totalPrice, setTotalPrice] = useState(0);
  const cartItem = cart?.find((item) => item.id === parseInt(id));
  const cake = cakes?.find((cake) => cake.name === cartItem?.name);

  const original = {
    size: cartItem?.details.size,
    topping: cartItem?.details.topping,
    filling: cartItem?.details.filling,
    sponge: cartItem?.details.sponge,
    quantity: cartItem?.quantity,
    additionalInfo: cartItem?.details.additionalInfo,
  };
  const [editValues, setEditValues] = useState({ ...values });

  const handleUpdate = async () => {
    console.log(parseInt(cartItem.price) === totalPrice);

    if (
      JSON.stringify(editValues) === JSON.stringify(original) &&
      parseInt(cartItem.price) === totalPrice
    ) {
      return navigate("/cart");
    }

    if (cartItem.details.size !== editValues.size) {
      cartItem.details.size = editValues.size;
    }

    if (cartItem.details.topping !== editValues.topping) {
      cartItem.details.topping = editValues.topping;
    }

    if (cartItem.details.sponge !== editValues.sponge) {
      cartItem.details.sponge = editValues.sponge;
    }

    if (cartItem.details.filling !== editValues.filling) {
      cartItem.details.filling = editValues.filling;
    }

    if (cartItem.quantity !== editValues.quantity) {
      cartItem.details.quantity = editValues.quantity;
    }

    cartItem.price = totalPrice;

    const newCart = cart.map((item) =>
      item.id === parseInt(id) ? cartItem : item
    );
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
    navigate("/cart");
  };

  const handleReset = () => {
    setEditValues({
      size: cartItem?.details.size,
      topping: cartItem?.details.topping,
      filling: cartItem?.details.filling,
      sponge: cartItem?.details.sponge,
      quantity: cartItem?.quantity,
      additionalInfo: cartItem?.details.additionalInfo,
    });
  };

  // Update values when they change
  useEffect(() => {
    function sizePrice() {
      // eslint-disable-next-line default-case
      switch (editValues?.size) {
        case "none":
          setTotalPrice(cake?.price);
          if (editValues.topping === "none") break;
          toppingPrice();
          break;

        case "small-15cm":
          setTotalPrice(cake?.price);
          if (editValues.topping === "none") break;
          toppingPrice();
          break;

        case "medium-20cm":
          setTotalPrice(cake?.price + 300);
          if (editValues.topping === "none") break;
          toppingPrice();
          break;

        case "large-25cm":
          setTotalPrice(cake?.price + 500);
          if (editValues.topping === "none") break;
          toppingPrice();
          break;

        case "x-large-30cm":
          setTotalPrice(cake?.price + 700);
          if (editValues.topping === "none") break;
          toppingPrice();
          break;
      }
    }

    function toppingPrice() {
      // eslint-disable-next-line default-case
      switch (editValues?.topping) {
        case "none":
          break;

        case "1-number":
          setTotalPrice((prev) => prev + 45);
          break;

        case "2-numbers":
          setTotalPrice((prev) => prev + 90);
          break;

        case "3-numbers":
          setTotalPrice((prev) => prev + 120);
          break;

        case "4-numbers":
          setTotalPrice((prev) => prev + 180);
          break;
      }
    }

    sizePrice();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editValues.size, editValues.topping]);

  useEffect(() => {
    if (!cartItem) return;
    setTotalPrice(cartItem.price);

    setEditValues({
      size: cartItem?.details.size,
      topping: cartItem?.details.topping,
      filling: cartItem?.details.filling,
      sponge: cartItem?.details.sponge,
      quantity: cartItem?.details.quantity,
      additionalInfo: cartItem?.details.additionalInfo,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItem]);

  return (
    <>
      {cartItem ? (
        <div className="edit-cart-item-container">
          <h1 style={{ textAlign: "center", textDecoration: "underline" }}>
            Edit Cake Order
          </h1>

          <hr />

          <div className="cake-page edit-page-details-container">
            <div className="corner-button">
              <button onClick={() => navigate(-1)}>Back</button>
            </div>

            <figure className="cake-image-figure img">
              <img src={cake?.image.url} alt="Cake" />
            </figure>

            <section className="cake-info-section">
              <div className="name-price">
                <h2 className="cake-name">{cartItem.name}</h2>
              </div>

              <br />

              <p className="cake-description">{cake?.description}</p>

              <br />

              <h5 className="price">
                Total: R{(totalPrice * editValues.quantity).toFixed(2)}
              </h5>

              <br />
              <form
                className="cake-page-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="selections">
                  <SizeSelection
                    size={editValues.size}
                    setSize={setEditValues}
                  />
                  <SpongeSelection
                    sponge={editValues.sponge}
                    setSponge={setEditValues}
                  />
                  <FillingSelection
                    filling={editValues.filling}
                    setFilling={setEditValues}
                  />
                  <ToppingSelection
                    topping={editValues.topping}
                    setTopping={setEditValues}
                  />
                  <AdditionalInfo
                    AdditionalInfo={editValues.AdditionalInfo}
                    setAdditionalInfo={setEditValues}
                  />
                </div>

                <div className="cake-page-submit-form">
                  <QuantitySelection
                    quantity={editValues.quantity}
                    setQuantity={setEditValues}
                  />

                  <button type="submit" onClick={handleUpdate}>
                    Save
                  </button>

                  <button onClick={handleReset} onChange={handleReset}>
                    Reset
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      ) : (
        <h1
          style={{ display: "grid", placeContent: "center", height: "100vh" }}
        >
          Something went wrong
        </h1>
      )}
    </>
  );
};

export default EditCartItem;
