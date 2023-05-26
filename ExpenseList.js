import React from "react";
import classes from './ExpenseList.module.css'

const ExpenseList = (props) => {
  return (
    <React.Fragment>
      <ul className={classes.ul}>
        {props.items.map((item) => (
          <li key={item.id}>
            <span>{item.amount}</span>
            <span>{item.description}</span>
            <span>{item.category}</span>
            <div className={classes.actions}>
                <button className={classes.edit}>Edit</button>
                <button className={classes.delete}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default ExpenseList;