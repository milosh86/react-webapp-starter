import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "../../i18n";
import { connect } from "react-redux";
import { resourceFetchRequest } from "./someProtectedPageActions";
import Spinner from "../../components/Spinner";
import Card from "../../components/Card";

class SomeProtectedPage extends Component {
  componentDidMount() {
    this.props.dispatchResourceFetchRequest("resource1");
    // this.props.dispatchResourceFetchRequest('error');
  }

  renderPageContent() {
    const {
      someResource,
      isResourceFetchFailed,
      isResourceFetchInProgress
    } = this.props;

    if (isResourceFetchFailed) return "Failed to fetch resource";
    if (!someResource || isResourceFetchInProgress) return <Spinner />;

    return (
      <div>
        Hello, resource is fetched!
        <div>Resource ID: {someResource.resourceId}</div>
        <div>Resource Number: {someResource.resourceNumber}</div>
        <div>Resource Name: {someResource.resourceName}</div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Some Protected Page...</h1>
        Hello there, this is {translate("someMessage")}
        <div>{this.renderPageContent()}</div>
        <Card title="Hello, some card!" />
      </div>
    );
  }
}

SomeProtectedPage.propTypes = {
  someResource: PropTypes.object,
  isResourceFetchInProgress: PropTypes.bool.isRequired,
  isResourceFetchFailed: PropTypes.bool.isRequired,
  dispatchResourceFetchRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    someResource: state.someProtectedResourceReducer.someResource,
    isResourceFetchInProgress:
      state.someProtectedResourceReducer.isResourceFetchInProgress,
    isResourceFetchFailed:
      state.someProtectedResourceReducer.isResourceFetchFailed
  };
};

const mapDispatchToProps = {
  dispatchResourceFetchRequest: resourceFetchRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SomeProtectedPage);
