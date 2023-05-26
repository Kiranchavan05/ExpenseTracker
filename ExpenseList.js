import React from "react";
import classes from './ExpenseList.module.css'

const ExpenseList = (props) => {
  const deleteHandler = async(id) => {
    const response = await fetch(
      `https://expense-auth-ce2b3-default-rtdb.firebaseio.com/expenses/${id}.json`,
      {
        method : 'DELETE'
      }
    )
      const data = response
      console.log(data)
      props.onDelete(id)
  }
  
  const editHandler = async(item) => {
  const response = await fetch(
    `https://expense-auth-ce2b3-default-rtdb.firebaseio.com/expenses/${item.id}.json`
  );
  const data = await response.json();
  console.log(data);
  props.onEdit(item)
  deleteHandler(item.id)
  }
  
  

  return (
    <React.Fragment>
      <ul className={classes.ul}>
        {props.items.map((item) => (
          <li key={item.id}>
            <span>{item.amount}</span>
            <span>{item.description}</span>
            <span>{item.category}</span>
            <div className={classes.actions}>
                <button className={classes.edit} onClick={()=>{editHandler(item)}}>Edit</button>
                <button className={classes.delete} onClick={() => deleteHandler(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default ExpenseList;