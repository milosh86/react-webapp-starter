import React, { Component } from "react";
import PropTypes from "prop-types";

class PageNotFound extends Component {
  render() {
    return <h1>Page Not Found...</h1>;
  }
}

PageNotFound.propTypes = {
  prop: PropTypes.string.isRequired
};

export default PageNotFound;
