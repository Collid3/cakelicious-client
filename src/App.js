import "./css/App.css";
import "./css/cakepage.css";
import "./css/cart.css";
import "./css/contacts.css";
import "./css/header.css";
import "./css/main.css";
import "./css/menu.css";
import "./css/navigation.css";
import "./css/signInOut.css";
import "./css/editCartItem.css";
import "./css/checkout.css";
import React, { lazy, Suspense, useContext } from "react";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import { Route, Routes, Navigate } from "react-router-dom";
import DataContext from "./Context/DataContext";
import Home from "./pages/Home";
import Classes from "./pages/Classes";
import Contacts from "./pages/Contacts";
import Footer from "./components/Footer";
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const EditCartItem = lazy(() => import("./pages/EditCartItem"));
const CakePage = lazy(() => import("./pages/CakePage"));
const Admin = lazy(() => import("./Admin/Admin"));

function App() {
  const { admin, mounted } = useContext(DataContext);

  return (
    <div className="App">
      {mounted && (
        <>
          <Suspense
            fallback={
              <h2
                style={{
                  height: "100vh",
                  display: "grid",
                  placeContent: "center",
                }}
              >
                Loading...
              </h2>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/products/:id" element={<CakePage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/cart/edit/:id" element={<EditCartItem />} />
              <Route path="/cart/checkout" element={<Checkout />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/classes" element={<Classes />} />

              <Route path="/*" element={<Navigate to="/" replace />} />
              {admin && <Route path="/admin/*" element={<Admin />} />}
            </Routes>
          </Suspense>
        </>
      )}

      {!mounted && (
        <h2
          style={{ height: "100vh", display: "grid", placeContent: "center" }}
        >
          Loading...
        </h2>
      )}
    </div>
  );
}

export default App;
