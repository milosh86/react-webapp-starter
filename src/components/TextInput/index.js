import React, { Component } from "react";
import PropTypes from "prop-types";

import classNames from "classnames";
import styles from "./textInput.module.css";

class TextInput extends Component {
  render() {
    const {
      type = "text",
      placeholder,
      label,
      value,
      onChange,
      isRequired,
      name,
      error
    } = this.props;
    return (
      <div
        className={classNames(
          styles.Wrapper,
          "form-group",
          error ? "has-error" : undefined
        )}
      >
        <label className="form-label" htmlFor="input-example-1">
          {label}
          {isRequired && <sup className={styles.RequiredAsterisk}>*</sup>}
        </label>
        <input
          type={type}
          name={name}
          className="form-input"
          id="input-example-1"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.oneOfType(PropTypes.string, PropTypes.bool)
};

export default TextInput;
