import React, { useContext, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DataContext from "../../Context/DataContext";

const SignUp = () => {
  const { api, apiWithCred, setAccessToken, setLoggedIn, setUser, setAdmin } =
    useContext(DataContext);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const createUser = async () => {
    const email = emailRef.current.value.toLowerCase();
    const password = passwordRef.current.value;
    if (email === "" || password === "" || !email.includes("@")) {
      setError(true);
      return setErrorMessage("Email and password are required");
    }

    try {
      await api.post("/signup", {
        email: email,
        password: password,
      });

      setError(false);
      setErrorMessage("");

      console.log("done 1");

      const response = await apiWithCred.post("login", {
        email: email,
        password: password,
      });

      console.log(response);

      setAccessToken(response.data["accessToken"]);
      setUser(response.data.email);
      setLoggedIn(true);
      if (response.data.admin !== undefined) setAdmin(true);
      else setAdmin(false);
      emailRef.current.value = "";
      passwordRef.current.value = "";
      navigate("/");
    } catch (err) {
      console.log(err.response);
      setError(true);
      setErrorMessage(err.response.data.error);
    }
  };

  const handleCancel = () => {
    setError(false);
    setErrorMessage("");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <>
        <h1>Cakelicious Register Form</h1>

        <form
          className="auth-form"
          action=""
          onSubmit={(e) => e.preventDefault()}
        >
          <h2>Create a new account</h2>

          {error && <p className="Error-message">{errorMessage}</p>}
          <p>
            <label htmlFor="">Email: </label>
            <input
              ref={emailRef}
              type="email"
              placeholder="Email 1-30 characters"
              maxLength={30}
              required
            />
          </p>

          <p>
            <label htmlFor="">Password: </label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Strong password 1-40 characters"
              maxLength={40}
              required
            />
          </p>

          <p className="redirect">
            Already have an account?{" "}
            <Link to="/signin" style={{ color: "orange" }}>
              Log In
            </Link>
          </p>

          <div className="buttons">
            <button onClick={createUser}>Submit</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
          <br />
        </form>
      </>
    </div>
  );
};

export default SignUp;
