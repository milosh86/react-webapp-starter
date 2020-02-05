import React, { Component } from "react";
import PropTypes from "prop-types";

import classNames from "classnames";
import styles from "./button.module.css";

function Button({ type, children, className }) {
  return (
    <button className={classNames("btn", "btn-success", className)} type={type}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
