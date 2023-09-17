import "../css/Cakes.css";
import React, { useContext, useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import DataContext from "../../Context/DataContext";
import { Link } from "react-router-dom";
import defaultImage from "../../images/default.jpg";

const CakesHome = () => {
  const { cakes, apiWithCred, setCakes, filterCategory, setFilterCategory } =
    useContext(DataContext);
  const [filteredCakes, setFilteredCakes] = useState([]);

  const handleDelete = async (id) => {
    if (!id) return console.log("Cake id is required");
    const response = await apiWithCred.delete(`/cakes/${id}`);
    console.log(response);
    const newCakesList = cakes.filter((cake) => cake._id !== id);
    setCakes(newCakesList);
  };

  useEffect(() => {
    setFilteredCakes(
      cakes.filter(
        (cake) =>
          cake.category ===
          (filterCategory === "all" ? cake.category : filterCategory)
      )
    );
  }, [cakes, filterCategory]);

  return (
    <div className="admin-cakes-container" style={{ textAlign: "center" }}>
      <Link to="/admin" className="corner-button">
        <button>Back</button>
      </Link>

      <aside>
        <Navigation setFilterCategory={setFilterCategory} />
      </aside>

      <section>
        <div className="admin-cakes-home-header">
          <h1>
            {filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)}{" "}
            Cakes
          </h1>

          <div className="search-add-cake">
            <p>
              <input
                type="search"
                name="search"
                id=""
                placeholder="Search Cakes"
              />
            </p>

            <Link to="/admin/cakes/add" className="add-cake-button">
              <button>Add Cake</button>
            </Link>
          </div>
        </div>

        <div className="admin-main-cakes-container">
          <ul className="cakes">
            {filteredCakes?.map((cake) => (
              <li key={cake?._id} className="cake">
                <figure>
                  <img
                    loading="lazy"
                    src={
                      cake?.image.url === "default"
                        ? defaultImage
                        : cake?.image.url
                    }
                    alt="Cake"
                  />
                  <figcaption>
                    <h3>{cake?.name}</h3>
                    <div className="price-buy">
                      <p>From R{cake?.price.toFixed(2)}</p>
                      <div className="admin-cake-buttons">
                        <Link to={`/admin/cakes/edit/${cake._id}`}>
                          <button style={{ backgroundColor: "orange" }}>
                            Edit
                          </button>
                        </Link>
                        <button
                          style={{ backgroundColor: "red" }}
                          onClick={() => handleDelete(cake?._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CakesHome;
