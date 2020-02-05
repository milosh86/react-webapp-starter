import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

function Link({ to, isExternal, children }) {
  return isExternal ? (
    <a href={to} target="_blank">
      {children}
    </a>
  ) : (
    <RouterLink to={to} className="text-success">
      {children}
    </RouterLink>
  );
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  isExternal: PropTypes.bool
};

export default Link;
