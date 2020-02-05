import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./resetPasswordPage.module.css";
import { Link } from "react-router-dom";

class ResetPasswordPage extends Component {
  state = {
    error: ""
  };

  render() {
    return (
      <div className={styles.Wrapper}>
        <form className={styles.Form} onSubmit={this.handleSubmit}>
          <h1>Reset your password</h1>
          <input type="text" name="username" placeholder="Your Email" />
          <button type="submit">Reset your password</button>
          {this.state.error ? (
            <div className={styles.ErrorMessage}>{this.state.error}</div>
          ) : null}
          <hr />
          Do you have an account? <Link to="/login">Login!</Link>
        </form>
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  prop: PropTypes.string.isRequired
};

export default ResetPasswordPage;
