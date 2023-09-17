import "../css/AddCake.css";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataContext from "../../Context/DataContext";

const AddCake = () => {
  const { apiWithCred, setCakes } = useContext(DataContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const handleImage = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setValues((prev) => ({ ...prev, image: reader.result }));
    };
  };

  // ADDING IMAGE INFO TO DATABASE
  const addCake = async () => {
    if (
      values.category === "" ||
      values.name === "" ||
      values?.price < 0 ||
      values.description === "" ||
      values.image === ""
    ) {
      return console.log("All fields are required");
    }

    const newCake = {
      name: values.name,
      price: parseInt(values.price),
      category: values.category,
      description: values.description,
      image: values.image,
    };

    setLoading(true);

    try {
      const response = await apiWithCred.post("/cakes", newCake);
      newCake._id = response.data._id;
      newCake.image = {
        public_id: response.data.image.public_id,
        url: response.data.image.url,
      };
      setCakes((prev) => [...prev, newCake]);
      setValues((prev) => ({
        ...prev,
        price: "",
        name: "",
        description: "",
        image: "",
        category: "",
      }));

      // navigate("/admin/cakes");

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  function handleReset() {
    setValues({
      name: "",
      price: "",
      category: "",
      description: "",
      image: values.image,
    });
  }

  return (
    <div className="add-cake-container">
      <Link to="/admin/cakes" className="home-link corner-button">
        <button>Back</button>
      </Link>

      <form
        className="add-cake-form"
        action=""
        onSubmit={(e) => e.preventDefault()}
      >
        <h2>Add cake</h2>

        {loading && <h3 style={{ textAlign: "center" }}>Creating cake...</h3>}

        <p className="add-cake-name" id="add-cake-name">
          <label htmlFor="">Name:</label>
          <input
            spellCheck={false}
            type="text"
            placeholder="Cakelicious"
            value={values.name}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </p>

        <p>
          <label htmlFor="">Price: </label>
          <input
            type="Number"
            placeholder="R199.00"
            value={values.price}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, price: e.target.value }))
            }
          />
        </p>

        <p>
          <label htmlFor="">Category:</label>
          <select
            name=""
            id=""
            value={values.category}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="" defaultChecked>
              Choose an option
            </option>
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday</option>
            <option value="kidd">Kids</option>
            <option value="graduation">graduation</option>
            <option value="cupcake">cupcake</option>
          </select>
        </p>

        <p>
          <label htmlFor="">Image: </label>
          <input type="file" onChange={(e) => handleImage(e.target.files[0])} />
        </p>

        <p className="add-cake-description">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            placeholder="Write the description of this cake"
            value={values.description}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, description: e.target.value }))
            }
          ></textarea>
        </p>

        <section className="add-cake-buttons-container">
          <button onClick={addCake} className="add-cake-form-button">
            Submit
          </button>
          <button onClick={handleReset}>Reset</button>
        </section>
      </form>
    </div>
  );
};

export default AddCake;
