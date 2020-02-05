import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default function Checkbox({ name, label, className, error }) {
  return (
    <div
      className={classNames(
        "form-group",
        className,
        error ? "has-error" : undefined
      )}
    >
      <label className="form-checkbox">
        <input type="checkbox" name={name} />
        <i className="form-icon"></i> {label}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.bool
};
