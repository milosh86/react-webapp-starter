import React from "react";

import classNames from "classnames";
import styles from "./divider.module.css";

function Divider() {
  return <div className={classNames("divider", styles.Wrapper)} />;
}

export default Divider;
