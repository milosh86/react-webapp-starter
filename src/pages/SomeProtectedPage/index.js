import React, { Component } from "react";
import PropTypes from "prop-types";

class SomeProtectedPage extends Component {
  render() {
    return <h1>Some Protected Page...</h1>;
  }
}

SomeProtectedPage.propTypes = {
  prop: PropTypes.string.isRequired
};

export default SomeProtectedPage;
