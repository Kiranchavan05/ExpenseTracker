import React from "react";
import classes from './ExpenseList.module.css'

const ExpenseList = (props) => {
  return (
    <React.Fragment>
      <ul className={classes.ul}>
        {props.items.map((item) => (
          <li>
            <span>{item.amount}</span>
            <span>{item.description}</span>
            <span>{item.category}</span>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default ExpenseList;