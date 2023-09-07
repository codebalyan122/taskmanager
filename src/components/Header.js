import React from "react";
import Button from "./Button";
import styles from "../styles/Task.module.css";

const Header = ({ title, onAdd, showAdd }) => {
  return (
    <header className={styles.header}>
      <h1> {title}</h1>
      <Button
        color={showAdd ? "red" : "green"}
        text={showAdd ? "Close" : "Add"}
        onClick={onAdd}
      />
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker 2023",
};

// CSS IN JS
// const headingStyle = {
//     color: 'red', backgroundColor: 'black'
// }

export default Header;
