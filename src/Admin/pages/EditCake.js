import "../css/EditCake.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DataContext from "../../Context/DataContext";
import { BiUpload } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import defaultImage from "../../images/default.jpg";

const EditCake = () => {
  const { cakes, setCakes, apiWithCred } = useContext(DataContext);

  const [loading, setLoading] = useState(false);
  const imageRef = useRef(null);
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const cake = cakes.find((cake) => cake._id === id);
  const [values, setValues] = useState({
    name: cake?.name,
    price: cake?.price,
    category: cake?.category,
    description: cake?.description,
    image: cake?.image,
  });

  const handleImage = (file) => {
    setImage(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setValues((prev) => ({ ...prev, image: reader.result }));
    };
  };

  // submit changes
  const handleEdit = async () => {
    if (
      values.name === cake.name &&
      values.price === cake.price &&
      values.category === cake.category &&
      values.description === cake.description &&
      values.image.public_id === cake.image.public_id &&
      values.image.url === cake.image.url
    ) {
      return console.log("Nothing happens");
    }

    const newCake = {
      _id: cake._id,
      image: values.image,
      name: values.name,
      category: values.category,
      price: values.price,
      description: values.description,
    };

    setLoading(true);
    try {
      const response = await apiWithCred.put(`/cakes/${cake._id}`, newCake);
      newCake.image = {
        public_id: response.data.image.public_id,
        url: response.data.image.url,
      };
      const newCakeList = cakes.map((cake) =>
        cake._id === id ? newCake : cake
      );
      const editedCake = newCakeList.find((cake) => cake._id === id);
      setCakes(newCakeList);
      setValues({
        name: editedCake?.name,
        price: editedCake?.price,
        category: editedCake?.category,
        description: editedCake?.description,
        image: editedCake?.image,
      });

      setError("Cake Successfully updated");
    } catch (err) {
      setError("Error Occured. Could not go through");
    }

    setLoading(false);
  };

  // delete cake image
  async function handleDeleteImage() {
    const newCake = {
      _id: cake._id,
      image: "delete",
      name: values.name,
      category: values.category,
      price: values.price,
      description: values.description,
    };

    setLoading(true);

    await apiWithCred.put(`/cakes/${cake._id}`, newCake);

    setCakes(
      cakes.map((cake) =>
        cake._id === id
          ? { ...cake, image: { public_id: "default", url: "default" } }
          : cake
      )
    );

    setValues({
      name: cake?.name,
      price: cake?.price,
      category: cake?.category,
      description: cake?.description,
      image: { public_id: "default", url: "default" },
    });

    setLoading(false);
  }

  // Revert changes
  function handleReset() {
    setValues({
      _id: cake._id,
      image: cake?.image,
      name: cake?.name,
      category: cake?.category,
      price: cake?.price,
      description: cake?.description,
    });
    setImage(null);
  }

  if (error !== "") {
    setTimeout(() => {
      setError("");
    }, 2000);
  }

  return (
    <div className="edit-cake-container">
      <Link to="/admin/cakes" className="home-link corner-button">
        <button>Back</button>
      </Link>

      <h1>Edit Cake</h1>

      <form className="edit-cake-form" onSubmit={(e) => e.preventDefault()}>
        <section className="left">
          <div className="edit-image">
            {!image && (
              <img
                src={
                  cake.image.url === "default" ? defaultImage : cake.image.url
                }
                alt="cake"
              />
            )}

            {image && <img src={image} alt="" />}

            <input
              type="file"
              name="image"
              id=""
              ref={imageRef}
              onChange={(e) => handleImage(e.target.files[0])}
              className="edit-image-file-selector"
            />
          </div>

          <section className="edit-image-options">
            <BiUpload onClick={() => imageRef.current.click()} />

            <AiFillDelete onClick={handleDeleteImage} />
          </section>
        </section>

        {loading && (
          <p
            style={{
              fontSize: "2rem",
              textAlign: "center",
              lineHeight: "50px",
            }}
          >
            Loading...
          </p>
        )}

        {error.includes("not") && !loading && (
          <p
            style={{
              fontSize: "2rem",
              textAlign: "center",
              lineHeight: "50px",
              backgroundColor: "red",
              display: "none",
            }}
          >
            {error}
          </p>
        )}

        {error.includes("Successfully") && !loading && (
          <p
            style={{
              fontSize: "2rem",
              textAlign: "center",
              lineHeight: "50px",
              backgroundColor: "green",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          >
            {error}
          </p>
        )}

        <section className="right">
          <div className="edit-name">
            <label htmlFor="name">Name</label>

            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className="edit-category">
            <label htmlFor="category">Category</label>

            <select
              name="category"
              id="category"
              value={values.category}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday</option>
              <option value="kid">Kids</option>
              <option value="graduation">graduation</option>
              <option value="cupcake">cupcake</option>
            </select>
          </div>

          <div className="edit-price">
            <label htmlFor="price">Price</label>

            <input
              type="number"
              name="price"
              id="price"
              value={values.price}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, price: e.target.value }))
              }
            />
          </div>

          <div className="edit-description">
            <label htmlFor="description">Description</label>

            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              value={values.description}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, description: e.target.value }))
              }
            ></textarea>
          </div>

          <div className="edit-cake-buttons">
            <button onClick={handleEdit}>Save Changes</button>
            <button onClick={handleReset}>Revert</button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default EditCake;
