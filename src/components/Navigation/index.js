import React, {Component} from "react";
import PropTypes from "prop-types";

import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";

import classNames from "classnames";
import styles from "./navigation.module.css";
import Divider from "../Divider";

function NavHeader() {
  return <div className={styles.NavHeader} />;
}

class Navigation extends Component {
  render() {
    const {history, location, expanded, onExpandedChange, signOut} = this.props;

    return (
      <SideNav
        expanded={expanded}
        onSelect={selected => {
          if (selected === "logout") {
            signOut();
            return;
          }

          const to = "/" + selected;
          if (location.pathname !== to) {
            history.push(to);
          }
        }}
        onToggle={expanded => onExpandedChange(expanded)}>
        <Toggle />
        {expanded ? <NavHeader /> : null}
        {expanded ? (
          <div className={styles.UserInfo}>
            <div>Chris Tuchschmid</div>
            <div className={classNames(styles.UserRole, "text-gray")}>
              Administrator
            </div>
          </div>
        ) : null}
        <Nav defaultSelected="home">
          {expanded ? <Divider /> : null}
          <NavItem eventKey="home">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{fontSize: "1.75em"}} />
            </NavIcon>
            <NavText>Dashboard</NavText>
          </NavItem>
          <Divider />
          <NavItem eventKey="anouncements">
            <NavIcon>
              <i className="fa fa-fw fa-device" style={{fontSize: "1.75em"}} />
            </NavIcon>
            <NavText>Anouncements</NavText>
          </NavItem>
          <NavItem eventKey="reported-issues">
            <NavIcon>
              <i className="fa fa-fw fa-device" style={{fontSize: "1.75em"}} />
            </NavIcon>
            <NavText>Reported Issues</NavText>
          </NavItem>
          <Divider />
          <NavItem eventKey="properties">
            <NavIcon>
              <i className="fa fa-fw fa-device" style={{fontSize: "1.75em"}} />
            </NavIcon>
            <NavText>Properties</NavText>
          </NavItem>
          <NavItem eventKey="user-administration">
            <NavIcon>
              <i className="fa fa-fw fa-device" style={{fontSize: "1.75em"}} />
            </NavIcon>
            <NavText>User Administration</NavText>
          </NavItem>
          <NavItem eventKey="interfaces">
            <NavIcon>
              <i className="fa fa-fw fa-device" style={{fontSize: "1.75em"}} />
            </NavIcon>
            <NavText>Interfaces</NavText>
          </NavItem>
          <NavItem eventKey="settings">
            <NavIcon>
              <i className="fa fa-fw fa-device" style={{fontSize: "1.75em"}} />
            </NavIcon>
            <NavText>Settings</NavText>
          </NavItem>
          <Divider />
          <NavItem eventKey="my-profile">
            <NavIcon>
              <i className="fa fa-fw fa-device" style={{fontSize: "1.75em"}} />
            </NavIcon>
            <NavText>My Profile</NavText>
          </NavItem>
          <NavItem eventKey="account">
            <NavIcon>
              <i className="fa fa-fw fa-device" style={{fontSize: "1.75em"}} />
            </NavIcon>
            <NavText>Account</NavText>
          </NavItem>
          <Divider />
          <NavItem eventKey="logout">
            <NavIcon>
              <i className="fa fa-fw fa-logout" style={{fontSize: "1.75em"}} />
            </NavIcon>
            <NavText>Logout</NavText>
          </NavItem>
        </Nav>
      </SideNav>
    );
  }
}

Navigation.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired,
  onExpandedChange: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
