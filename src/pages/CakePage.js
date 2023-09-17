import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DataContext from "../Context/DataContext";
import CakePageContext from "../Context/CakePageContext";
import { BsCart3 } from "react-icons/bs";
import CakeForm from "../components/cakePage/CakeForm";
import lodash from "lodash";

const CakePage = () => {
  const { cakes, navigate, loading, setCart, cart } = useContext(DataContext);
  const { values, setValues } = useContext(CakePageContext);

  const { id } = useParams();
  const cake = cakes.find((cake) => cake._id === id);
  const [totalPrice, setTotalPrice] = useState(0);

  // indicate where the error occured
  function throwValuesRequiredError(element) {
    element.style.background = "red";
    element.style.borderRadius = "10px";
    element.style.transition = "0.5s all";
  }

  // remove error indicator
  function valuesRequirementsMet(element) {
    element.style.background = "transparent";
    element.style.borderRadius = "0px";
    element.style.transition = "0.5s all";
  }

  // Update values when they change
  useEffect(() => {
    function sizePrice() {
      // eslint-disable-next-line default-case
      switch (values?.size) {
        case "none":
          setTotalPrice(cake?.price);
          if (values.topping === "none") break;
          toppingPrice();
          break;

        case "small-15cm":
          setTotalPrice(cake?.price);
          if (values.topping === "none") break;
          toppingPrice();
          break;

        case "medium-20cm":
          setTotalPrice(cake?.price + 300);
          if (values.topping === "none") break;
          toppingPrice();
          break;

        case "large-25cm":
          setTotalPrice(cake?.price + 500);
          if (values.topping === "none") break;
          toppingPrice();
          break;

        case "x-large-30cm":
          setTotalPrice(cake?.price + 700);
          if (values.topping === "none") break;
          toppingPrice();
          break;
      }
    }

    function toppingPrice() {
      // eslint-disable-next-line default-case
      switch (values?.topping) {
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
  }, [values.size, values.topping]);

  // Add order info to cart
  async function addToCart() {
    const sizeEl = document.getElementById("size-selection");
    const spongeEl = document.getElementById("sponge-selection");
    const fillingEl = document.getElementById("filling-selection");

    console.log(values);

    if (
      values.size === "none" ||
      values.sponge === "none" ||
      values.filling === "none"
    ) {
      if (values.size === "none") {
        throwValuesRequiredError(sizeEl);
      } else {
        valuesRequirementsMet(sizeEl);
      }

      if (values.sponge === "none") {
        throwValuesRequiredError(spongeEl);
      } else {
        valuesRequirementsMet(spongeEl);
      }

      if (values.filling === "none") {
        throwValuesRequiredError(fillingEl);
      } else {
        valuesRequirementsMet(fillingEl);
      }

      return console.log("Fix first");
    } else {
      valuesRequirementsMet(sizeEl);
      valuesRequirementsMet(spongeEl);
      valuesRequirementsMet(fillingEl);
    }

    // create new cart item
    const duplicate = cart.find(
      (item) =>
        item.name === cake.name &&
        lodash.isEqual(
          lodash.omit(values, "quantity"),
          lodash.omit(item.details, "quantity")
        )
    );

    if (duplicate) {
      const newCart = cart.map((item) =>
        item.name === cake.name &&
        lodash.isEqual(
          lodash.omit(values, "quantity"),
          lodash.omit(item.details, "quantity")
        )
          ? {
              ...item,
              details: { ...item.details, quantity: item.details.quantity + 1 },
            }
          : item
      );

      localStorage.setItem("cart", JSON.stringify([...newCart]));
      console.log("done");
      return setCart(newCart);
    }

    const id = cart.length > 0 ? cart[cart.length - 1].id + 1 : 1;

    const newItem = {
      id,
      image: cake.image.url,
      name: cake.name,
      details: {
        size: values.size,
        sponge: values.sponge,
        filling: values.filling,
        topping: values.topping,
        additionalInfo: values.additionalInfo,
        quantity: values.quantity,
      },
      price: cake?.price,
    };

    localStorage.setItem("cart", JSON.stringify([...cart, newItem]));

    const newCart = [...cart, newItem];
    setCart(newCart);
  }

  return (
    <div className="cake-container">
      {cake && (
        <div className="cake-page-container">
          <div className="corner-button">
            <div className="cart-navigate" style={{ fontSize: "2rem" }}>
              <Link to="/cart">
                <BsCart3 />
              </Link>
              {cart?.length > 0 && (
                <div className="cart-items-number">{cart?.length}</div>
              )}
            </div>
            <button onClick={() => navigate(-1)}>Back</button>
          </div>

          <br />
          <h1 style={{ textAlign: "center", textDecoration: "underline" }}>
            Cake Order
          </h1>

          <hr />

          <div className="cake-page">
            <figure className="cake-image-figure">
              <img src={cake.image.url} alt="Cake" />
            </figure>

            <section className="cake-info-section">
              <div className="name-price">
                <h2 className="cake-name">{cake.name}</h2>
              </div>

              <p className="cake-description">{cake.description}</p>

              <h5 className="price">
                Total: R
                {(
                  (totalPrice ? totalPrice : cake.price) * values.quantity
                ).toFixed(2)}
              </h5>

              <br />

              <CakeForm
                values={values}
                setValues={setValues}
                addToCart={addToCart}
              />
            </section>

            {loading && (
              <p
                style={{
                  height: "70vh",
                  width: "100%",
                  display: "grid",
                  placeContent: "center",
                }}
              >
                Cake loading...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CakePage;
