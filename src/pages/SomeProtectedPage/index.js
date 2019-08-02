import React, { Component } from "react";
import PropTypes from "prop-types";
import {translate} from "../../i18n";

class SomeProtectedPage extends Component {
  render() {
    return (
      <div>
        <h1>Some Protected Page...</h1>
        Hello there, this is {translate('someMessage')}
      </div>
    );
  }
}

SomeProtectedPage.propTypes = {};

export default SomeProtectedPage;
