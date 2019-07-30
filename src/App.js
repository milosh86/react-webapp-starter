import React from "react";
import jwtDecode from "jwt-decode";
import {
  getAccessTokenFromCache,
  getRefreshTokenFromCache,
  getUserDataFromCache
} from "./auth/localStorage";
import { immediateSignIn, isAuthenticated } from "./auth/auth";
import SignInPage from "./pages/SignInPage";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

class App extends React.Component {
  componentDidMount() {
    const accessToken = getAccessTokenFromCache();
    const refreshToken = getRefreshTokenFromCache();
    const userData = getUserDataFromCache();

    if (!accessToken || !refreshToken || !userData) return;

    try {
      const decodedRefreshToken = jwtDecode(refreshToken);

      if (decodedRefreshToken.exp * 1000 < Date.now()) {
        // eslint-disable-next-line
        console.warn("Refresh token expired ...");
        return;
      }
    } catch (e) {
      // eslint-disable-next-line
      console.warn("Jwt decoding failed", e);
      return;
    }

    immediateSignIn({ accessToken, refreshToken, userData });
  }

  render() {
    if (!isAuthenticated()) {
      return (
        <Router>
          <Switch>
            <Route path="/login" component={SignInPage} />
            <Route
              render={props =>
                console.log("asjjkdahsk", props) || (
                  <Redirect
                    to={{ pathname: "/login", state: { from: props.location } }}
                  />
                )
              }
            />
          </Switch>
        </Router>
      );
    } else {
    }
  }
}

export default App;
