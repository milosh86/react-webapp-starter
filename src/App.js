import React, { Suspense, lazy } from "react";
import jwtDecode from "jwt-decode";
import {
  getAccessTokenFromCache,
  getRefreshTokenFromCache,
  getUserDataFromCache
} from "./auth/localStorage";
import {
  immediateSignIn,
  isAuthenticated,
  registerAuthUpdateListener
} from "./auth/auth";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import Spinner from "./components/Spinner";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import { registerLocaleChangeListener } from "./i18n";

const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const ConfirmNewPasswordPage = lazy(() => import("./pages/ConfirmNewPasswordPage"));
const SomeProtectedPage = lazy(() => import("./pages/SomeProtectedPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

class App extends React.Component {
  state = {
    isInitialized: false
  };

  componentDidMount() {
    this.initSignInDataFromCache();
    this.setState({
      isInitialized: true
    });

    // EXPERIMENTAL
    // Update the whole App on important updates in global modules (locale, auth)...
    // It seems easier to hook global modules like this, than using react Context API,
    // or storing global info in Redux.
    registerLocaleChangeListener(() => this.forceUpdate());
    registerAuthUpdateListener(() => this.forceUpdate());
  }

  initSignInDataFromCache() {
    const accessToken = getAccessTokenFromCache();
    const refreshToken = getRefreshTokenFromCache();
    const userData = getUserDataFromCache();

    if (!accessToken || !refreshToken || !userData) return;

    // try {
    //   const decodedRefreshToken = jwtDecode(refreshToken);
    //
    //   if (decodedRefreshToken.exp * 1000 < Date.now()) {
    //     // eslint-disable-next-line
    //     console.warn("Refresh token expired ...");
    //     return;
    //   }
    // } catch (e) {
    //   // eslint-disable-next-line
    //   console.warn("Jwt decoding failed", e);
    //   return;
    // }

    immediateSignIn({ accessToken, refreshToken, userData });
  }

  render() {
    if (this.state.isInitialized === false) {
      return <Spinner />;
    }

    return (
      <Router>
        {isAuthenticated() ? <Header /> : null}
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/login" component={SignInPage} />
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/reset-password" component={ResetPasswordPage} />
            <Route path="/confirm-password" component={ConfirmNewPasswordPage} />
            <Redirect exact from="/" to="home" />
            <PrivateRoute path="/home" component={SomeProtectedPage} />
            <PrivateRoute component={PageNotFound} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
