import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./signInPage.module.css";

class SignInPage extends Component {
  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className={styles.Wrapper}>
        <form className={styles.Form} onSubmit={this.handleSubmit}>
          <h1>Sign In</h1>
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

SignInPage.propTypes = {
  prop: PropTypes.string.isRequired
};

export default SignInPage;
