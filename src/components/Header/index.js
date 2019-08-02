import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./header.module.css";
import classNames from "classnames";
import { LOCALE, selectedLocale, updateLocale } from "../../i18n";
import {signOut} from "../../auth/auth";

class Header extends Component {
  render() {
    return (
      <div className={styles.Header}>
        <div>Logo</div>

        <div className={styles.Right}>
          <div className={styles.Locale}>
            Locale:{" "}
            <button
              className={classNames(
                styles.LocaleButton,
                selectedLocale === LOCALE.EN ? styles.LocaleSelected : null
              )}
              onClick={() => updateLocale(LOCALE.EN)}
            >
              EN
            </button>
            <button
              className={classNames(
                styles.LocaleButton,
                selectedLocale === LOCALE.DE ? styles.LocaleSelected : null
              )}
              onClick={() => updateLocale(LOCALE.DE)}
            >
              DE
            </button>
          </div>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  prop: PropTypes.string.isRequired
};

export default Header;
