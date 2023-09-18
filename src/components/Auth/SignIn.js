import React, { useContext, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DataContext from "../../Context/DataContext";

const SignIn = () => {
  const {
    setLoggedIn,
    setAccessToken,
    apiWithCred,
    setMenu,
    setUser,
    setAdmin,
  } = useContext(DataContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (emailRef?.current.value === "" || passwordRef?.current.value === "") {
      setError(true);
      return setErrorMessage("Email and password are required");
    }

    const email = emailRef?.current.value.toLowerCase();
    const password = passwordRef?.current.value;

    try {
      const response = await apiWithCred.post("/login", {
        email: email,
        password: password,
      });
      // userCred = await signInWithEmailAndPassword(auth, response.email, password);

      setAccessToken(response.data.accessToken);
      setLoggedIn(true);
      if (response.data.admin !== undefined) setAdmin(true);
      else setAdmin(false);
      setMenu(false);
      emailRef.current.value = "";
      passwordRef.current.value = "";
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
      setErrorMessage(err.message);
    }
  };

  const handleCancel = () => {
    setError(false);
    setErrorMessage("");
    setMenu(true);
    navigate("/");
  };

  return (
    <div className="auth-container">
      <>
        <h1>Cakelicious Login Form</h1>

        <form
          className="auth-form"
          action=""
          onSubmit={(e) => e.preventDefault()}
        >
          <h2>Log in</h2>

          {error && <p className="Error-message">{errorMessage}</p>}

          <p>
            <input ref={emailRef} type="email" placeholder="Email address" />
          </p>

          <p>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              autoComplete="on"
            />
          </p>

          <div className="buttons">
            <button onClick={handleLogin}>Submit</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>

          <p className="redirect redirect-signin">
            New to Cakelicious? <Link to="/signup">Create account</Link>
          </p>
          <div className="forgot-password">
            <Link>Forgot Password?</Link>
          </div>
        </form>
      </>
    </div>
  );
};

export default SignIn;
