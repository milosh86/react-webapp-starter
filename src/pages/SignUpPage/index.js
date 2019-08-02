import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isAuthenticated, signOut, signUp } from "../../auth/auth";
import styles from "./signUpPage.module.css";

function SignUpPage({ history }) {
  let [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated()) signOut();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const email = event.target.email.value;
    const username = event.target.username.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (!username || !password || !email) {
      setError("Username, password and email are required!");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Invalid email");
      return;
    }

    if (password !== confirmPassword) {
      setError("The password confirmation does not match");
      return;
    }

    signUp({ username, password, email })
      .then(() => {
        history.replace("/");
      })
      .catch(err => {
        console.warn("Sign Up failed:", err);
        setError("Sign In failed!");
      });
  }

  return (
    <div className={styles.Wrapper}>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <input type="text" name="username" placeholder="Username" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <button type="submit">Submit</button>
      </form>
      {error ? <div className={styles.ErrorMessage}>{error}</div> : null}
    </div>
  );
}

SignUpPage.propTypes = {
  history: PropTypes.object.isRequired
};

export default SignUpPage;
