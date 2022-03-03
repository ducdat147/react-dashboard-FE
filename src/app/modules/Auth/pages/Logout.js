import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {LayoutSplashScreen} from "../../../../_metronic/layout";
import * as auth from "../_redux/authRedux";

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    const { hasAccess } = this.props;
    return hasAccess ? <LayoutSplashScreen /> : <Redirect to="/auth/login" />;
  }
}

export default connect(
  ({ auth }) => ({ hasAccess: Boolean(auth.access) }),
  auth.actions
)(Logout);
