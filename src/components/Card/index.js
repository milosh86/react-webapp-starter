import React from "react";
import PropTypes from "prop-types";
import Divider from "../Divider";
import styles from "./card.module.css";

function Card({title, children}) {
  return (
    <div className={styles.Wrapper}>
      <h1>{title}</h1>
      <Divider />
      {children}
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Card;
