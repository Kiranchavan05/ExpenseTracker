import React,{useState,useEffect} from "react";
import classes from './ExpenseList.module.css'
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/Expenses";


const ExpenseList = (props) => {
  const [receivedExpense, setReceivedExpense] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(
      "https://expense-auth-ce2b3-default-rtdb.firebaseio.com/expenses.json"
    )
      .then((response) => {
        
        if (response.ok) {
          
          return response.json();
        } else {
          return response.json().then((data) => {
            if (data.error.message) {
              alert(data.error.message);
            }
          });
        }
      })
      .then((data) => {
        console.log("data ", data);
        setReceivedExpense(data);
        dispatch(expenseActions.receivedData(data));
      });
  }, [dispatch]);

  const deleteHandler = async (id) => {
    console.log("wewewewew", id);
    const response = await fetch(
      `https://expense-auth-ce2b3-default-rtdb.firebaseio.com/expenses/${id}.json`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      setReceivedExpense((prevExpenses) => {
        const updatedExpenses = { ...prevExpenses };
        delete updatedExpenses[id];
        return updatedExpenses;
      });
    }
  };

  const editHandler = async (key) => {

    const response = await fetch(
      `https://expense-auth-ce2b3-default-rtdb.firebaseio.com/expenses/${key}.json`
    );
    const data = await response.json();
    console.log(data);

    const {amount , description, category } = receivedExpense[key]

    const obj = {
      amount : amount,
      description : description,
      category : category 
    }
    props.onEdit(obj)
    deleteHandler(key)

  };

  return (
    <React.Fragment>
      <ul className={classes.ul}>

        { receivedExpense?
        Object.keys(receivedExpense).map((key) => (
          <li key={key}>
            <span>{receivedExpense[key].amount}/-</span>
            <span>{receivedExpense[key].description}</span>
            <span>{receivedExpense[key].category}</span>
            <div className={classes.actions}>
              <button className={classes.edit} onClick={() => editHandler(key)}>
                Edit
              </button>
              <button
                className={classes.delete}
                onClick={() => deleteHandler(key)}
              >
                Delete
              </button>
            </div>
          </li>
        )) :<h2>No data found </h2>}
      </ul>
    </React.Fragment>
  );
};

export default ExpenseList;