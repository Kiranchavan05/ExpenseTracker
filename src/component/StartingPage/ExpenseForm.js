import React, { Fragment, useRef ,useEffect} from "react";
import classes from './ExpenseForm.module.css'

const ExpenseForm = (props) => {
    const inputPrice = useRef()
    const inputDesc = useRef()
    const inputCat = useRef()
    // const [expenses,setExpense]=useState([])

    // useEffect(() => {
    //   if (props.editingId) {
    //     // Find the expense item with the editingId
    //     const editingExpense = props.items.find(
    //       (item) => item.id === props.editingId.id
    //     );
  
    //     // If the expense is found, prefill the form fields
    //     if (editingExpense) {
    //       inputPrice.current.value = editingExpense.amount;
    //       inputDesc.current.value = editingExpense.description;
    //       inputCat.current.value = editingExpense.category;
    //     }
    //   }
    // }, [props.editingId, props.items]);
  
  
  
    // useEffect(() => {
    //   const fetchExpenseData = async () => {
    //     if (props.editingId) {
    // const response = await fetch(
    //   `https://expense-auth-ce2b3-default-rtdb.firebaseio.com/expenses/${props.editingId.id}.json`
    // );
    // const data = await response.json();
    // inputPrice.current.value = data.amount;
    // inputDesc.current.value = data.description;
    // inputCat.current.value = data.category;
    //     }
    //   };
  
    //   fetchExpenseData();
    // }, [props.editingId]);

    useEffect(()=>{
      if(props.editItem){
        inputPrice.current.value=props.editItem.amount;
        inputDesc.current.value=props.editItem.description;
        inputCat.current.value=props.editItem.category
      }
    },[props.editItem])

    const submitHandler = async event => {
        event.preventDefault()

        const enteredPrice = inputPrice.current.value
        const enteredDesc = inputDesc.current.value;
        const enteredCat = inputCat.current.value;

        const obj = {
            amount : enteredPrice,
            description : enteredDesc,
            category : enteredCat
        }

        // props.onSaveData(obj)
        try{
          const response = await fetch("https://expense-auth-ce2b3-default-rtdb.firebaseio.com/expenses.json",{
            method : 'POST',
            body : JSON.stringify(obj),
            headers : {
              'Content-Type' : 'application/json'
            }
          })
          const data =await response.json()
          console.log(data)

        } catch(error){
          console.log(error)
        }
       
        // setExpense([...expenses,obj])
        window.location.reload()
        
        inputPrice.current.value =''
        inputDesc.current.value =''
        inputCat.current.value = ''

    }

    return (
      <Fragment>
        <form className={classes.form} onSubmit={submitHandler}>
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" ref={inputPrice} required />
          <label htmlFor="desc">Description</label>
          <input type="text" id="desc" required ref={inputDesc} />
          <label htmlFor="cat">Category</label>
          <select id="cat" ref={inputCat}>
            <option value="food">Food</option>
            <option value="electricity">Electricity</option>
            <option value="petrol">Petrol</option>
            <option value="salary">Salary</option>
          </select>
          <button>Add Expense</button>
        </form>
      </Fragment>
    );
}

export default ExpenseForm