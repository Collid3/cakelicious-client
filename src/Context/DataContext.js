import { useState, createContext, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [menu, setMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [cakes, setCakes] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [filterCategory, setFilterCategory] = useState("all");
  const [filteredCakes, setFilteredCakes] = useState([]);
  const searchRef = useRef();
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  const api = axios.create({
    baseURL: "https://cakelicious.onrender.com",
  });

  const apiWithCred = axios.create({
    baseURL: "https://cakelicious.onrender.com",
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  useEffect(() => {
    const fetchCakes = async () => {
      setLoading(true);
      try {
        const response = await api.get("/cakes");
        setCakes(response.data.cakes);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    function fetchCart() {
      if (localStorage.getItem("cart")) {
        setCart([...JSON.parse(localStorage.getItem("cart"))]);
      } else return;
    }

    fetchCart();
    fetchCakes();

    return () => {
      console.log("Clean up done");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    if (!Cookies.get("jwt")) return setMounted(true);

    const refreshToken = async () => {
      const response = await apiWithCred.get("/refresh");
      setAccessToken(response.data.accessToken);
      setLoggedIn(true);
      if (response.data.admin !== undefined) {
        setAdmin(true);
      } else setAdmin(false);
      return setMounted(true);
    };

    refreshToken();
  }, []);

  return (
    <DataContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        accessToken,
        setAccessToken,
        api,
        navigate,
        menu,
        setMenu,
        user,
        setUser,
        admin,
        setAdmin,
        cakes,
        category,
        setCategory,
        setCakes,
        loading,
        setLoading,
        apiWithCred,
        filterCategory,
        setFilterCategory,
        searchRef,
        cart,
        setCart,
        filteredCakes,
        setFilteredCakes,
        error,
        mounted,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
