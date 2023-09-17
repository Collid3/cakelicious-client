import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../Context/DataContext";

const Navigation = () => {
  const { setFilterCategory, filterCategory } = useContext(DataContext);

  const navigate = useNavigate();

  function goTo(cat) {
    if (window.location.pathname.slice(0, 6) === "/admin") {
      navigate("/admin/cakes");
      return setFilterCategory(cat);
    }

    navigate("/");
    setFilterCategory(cat);
  }

  return (
    <nav className="navigation-container">
      <h3>CATEGORIES</h3>

      <ul className="navigation-list">
        <li
          onClick={() => goTo("all")}
          className={`${filterCategory === "all" && "selected"}`}
        >
          All
        </li>

        <li
          onClick={() => goTo("wedding")}
          className={`${filterCategory === "wedding" && "selected"}`}
        >
          Wedding
        </li>

        <li
          onClick={() => goTo("birthday")}
          className={`${filterCategory === "birthday" && "selected"}`}
        >
          Birthday
        </li>

        <li
          onClick={() => goTo("kids")}
          className={`${filterCategory === "kids" && "selected"}`}
        >
          Kids
        </li>

        <li
          onClick={() => goTo("graduation")}
          className={`${filterCategory === "graduation" && "selected"}`}
        >
          Graduation
        </li>
      </ul>

      <select value={filterCategory} onChange={(e) => goTo(e.target.value)}>
        <option value="all">All</option>
        <option value="wedding">Wedding</option>
        <option value="birthday">Birthday</option>
        <option value="kids">Kids</option>
        <option value="graduation">Graduation</option>
      </select>
    </nav>
  );
};

export default Navigation;
