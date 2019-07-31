import React, { Suspense, lazy } from "react";
import jwtDecode from "jwt-decode";
import {
  getAccessTokenFromCache,
  getRefreshTokenFromCache,
  getUserDataFromCache
} from "./auth/localStorage";
import { immediateSignIn } from "./auth/auth";
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import Spinner from "./components/Spinner";
import PrivateRoute from "./components/PrivateRoute";

const SignInPage = lazy(() => import("./pages/SignInPage"));
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
    if (this.state.isInitialized === false) return <Spinner />;

    return (
      <Router>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/login" component={SignInPage} />
            <PrivateRoute
              path="/some-protected-page"
              component={SomeProtectedPage}
            />
            <PrivateRoute component={PageNotFound} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
