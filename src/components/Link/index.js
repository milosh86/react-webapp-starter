import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

function Link({ to, children }) {
  return (
    <RouterLink to={to} className="text-success">
      {children}
    </RouterLink>
  );
}

Link.propTypes = {
  to: PropTypes.string.isRequired
};

export default Link;
