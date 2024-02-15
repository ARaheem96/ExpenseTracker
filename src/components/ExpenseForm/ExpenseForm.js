import React, { useEffect, useRef } from "react";
import styles from "./ExpenseForm.module.css";


const ExpenseForm = ({ addExpense ,currentExpense ,setCurrentExpense,editExpense}) => {
   const expenseTextInput = useRef(null);
   const expenseAmountInput = useRef(null);

   const isEdit=Boolean(currentExpense);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const expenseText = expenseTextInput.current.value;
    const expenseAmount = expenseAmountInput.current.value;
    expenseTextInput.current.focus();
    if (parseInt(expenseAmount) === 0) {
      return;
    }
    
    const expense = {
      text: expenseText,
      amount: expenseAmount,
      id: isEdit?currentExpense.id:new Date().getTime()
    };


    isEdit ? editExpense(expense) : addExpense(expense);
    clearInput();
    setCurrentExpense(null);
    return;
  };

  const clearInput = () => {
    expenseAmountInput.current.value = "";
    expenseTextInput.current.value = "";
  };

  useEffect(()=>{
    if(currentExpense){
      console.log({currentExpense})
      expenseAmountInput.current.value = currentExpense.amount;
      expenseTextInput.current.value = currentExpense.text;
    }
    else{
      clearInput();
    }
  },[currentExpense])

  useEffect(()=>{
    expenseTextInput.current.focus();
  }, []);

  const cancelEdit = () =>{
   setCurrentExpense(null);
   clearInput()
  } 

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h3>{isEdit?'Edit':'Add new'} transaction</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        ref={expenseTextInput}
        required
      />
      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense,positive-income)</div>
      </div>
      <input
        className={styles.input}
        id="expenseAmount"
        type="number"
        placeholder="Enter amount..."
        ref={expenseAmountInput}
        required
      />
      <button className={styles.submitBtn} type="submit">{isEdit?'Edit':'Add'} Transaction</button>
      {isEdit && <button className={styles.submitBtn} type="button" onClick={cancelEdit}>Cancel</button>}
    </form>
  );
};

export default ExpenseForm;
