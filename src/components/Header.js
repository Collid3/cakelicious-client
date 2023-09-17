import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BsPersonCircle, BsCart3 } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import DataContext from "../Context/DataContext";
import Menu from "./Menu";
const Logo = require("../images/Logo.png");

const Header = () => {
  const {
    loggedIn,
    setMenu,
    menu,
    apiWithCred,
    setAccessToken,
    setLoggedIn,
    admin,
    setAdmin,
    cart,
  } = useContext(DataContext);

  const menuRef = useRef();

  console.log(loggedIn);

  return (
    <header>
      <section className="top-header">
        <div className="left-header">
          <div className="logo">
            <img src={Logo} alt="Logo" height={50} />
          </div>
        </div>

        <div className={`right-header ${loggedIn && "loggedin"}`}>
          <div className="cart-navigate">
            <Link to="/cart">
              <BsCart3 />
            </Link>
            {cart?.length > 0 && (
              <div className="cart-items-number">{cart?.length}</div>
            )}
          </div>

          <div className="profile">
            {!loggedIn ? (
              <div onClick={() => setMenu(!menu)} ref={menuRef}>
                {!menu ? (
                  <BiMenu className="menu-bar" />
                ) : (
                  <MdClose className="menu-bar" />
                )}
              </div>
            ) : (
              <div>
                <FaUserAlt onClick={() => setMenu(!menu)} />

                {admin && (
                  <p className="admin-button">
                    <Link to="/admin" style={{ color: "white" }}>
                      Admin
                    </Link>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {menu && (
          <Menu
            loggedIn={loggedIn}
            setMenu={setMenu}
            apiWithCred={apiWithCred}
            setAccessToken={setAccessToken}
            setLoggedIn={setLoggedIn}
            setAdmin={setAdmin}
          />
        )}
      </section>
    </header>
  );
};

export default Header;
