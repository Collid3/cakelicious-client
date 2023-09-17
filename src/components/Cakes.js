import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DataContext from "../Context/DataContext";
import defaultImage from "../images/default.jpg";

const Wedding = () => {
  const { cakes, loading, filterCategory, error } = useContext(DataContext);

  const [search, setSearch] = useState("");

  const filteredCakes = cakes.filter(
    (cake) =>
      cake.category ===
      (filterCategory === "all" ? cake.category : filterCategory)
  );

  return (
    <div className="cakes-main-container">
      {cakes?.length > 0 && !loading && !error && (
        <div className="cakes-container">
          <div className="cakes-container-header">
            {search === "" ? (
              <h2>{filterCategory + " cakes"}</h2>
            ) : (
              <h4>Results for: '{search}'</h4>
            )}

            <input
              type="text"
              className="search-container"
              placeholder="Search product"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <ul className="cakes">
              {filteredCakes
                ?.filter(
                  (cake) =>
                    cake.name.toLowerCase().includes(search.toLowerCase()) ||
                    cake.category.toLowerCase().includes(search.toLowerCase())
                )
                .map((cake) => (
                  <li key={cake._id} className="cake">
                    <figure>
                      <img
                        loading="lazy"
                        src={
                          cake.image.url === "default"
                            ? defaultImage
                            : cake.image.url
                        }
                        alt=""
                      />
                      <figcaption>
                        <h3>{cake.name}</h3>
                        <div className="price-buy">
                          <p>From R{cake.price.toFixed(2)}</p>
                          <div className="cake-buttons">
                            <Link to={`/products/${cake._id}`}>
                              <button>Select</button>
                            </Link>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </li>
                ))}
            </ul>
            <br />
          </div>
        </div>
      )}

      {loading && (
        <p style={{ height: "200px", display: "grid", placeContent: "center" }}>
          Cakes loading...
        </p>
      )}

      {cakes.length === 0 && !loading && !error && (
        <p style={{ height: "100px", display: "grid", placeContent: "center" }}>
          No cakes to display
        </p>
      )}

      {error === "Network Error" && (
        <h2
          style={{
            height: "100%",
            display: "grid",
            placeContent: "center",
            textAlign: "center",
          }}
        >
          No internet access. Check your mobile data or wifi
        </h2>
      )}
    </div>
  );
};

export default Wedding;
