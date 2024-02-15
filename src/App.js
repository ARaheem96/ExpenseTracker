// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import { db } from "./firebaseInit";
import { collection, addDoc, getDocs, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";

import "./App.css";

function App() {

  const [expenses, setExpenses] = useState([]);

  const [currentExpense,setCurrentExpense] = useState(null)

    async function addExpense(expense) {

    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "expense"), {
    text: expense.text,
    amount: expense.amount,
    cratedOn    : expense.id
    });
    
    // setExpenses((prevState) => [expense, ...prevState]);
  };

  useEffect(()=>{

    // async function fetchData(){
    //   const snapShot = await getDocs(collection(db, "expense"));
    //   const expense = snapShot.docs.map((doc) =>{
    //     return {
    //       id : doc.id,
    //       ...doc.data()
    //     }
    //   })
    //   setExpenses(expense);
    // }
    // fetchData();

    // real time update
    const unsub = onSnapshot(collection(db, 'expense') ,(snapShot) =>{

      const expense = snapShot.docs.map((doc) =>{

        return{
          id: doc.id,
          ...doc.data()
        }
      })

      setExpenses(expense);
    })
  }, [])

  async function deleteExpense(id){
    window.alert("Do You Wanna To Delete");
    
    const docRef = doc(db, "expense",id);

    await deleteDoc(docRef);
  };

  const changeExpenseToUpdate = (id) =>{
    console.log(id);
    let data = expenses[id];
    setCurrentExpense(data)
  }

  async function editExpense (expense){
    console.log(expense)
    
    const expenseRef = doc(db, "expense", expense.id);
    await updateDoc(expenseRef, expense);
    // setExpenses(updatedExpenses)

  }

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <div className="inputField">
        <ExpenseForm addExpense={addExpense} currentExpense={currentExpense} setCurrentExpense={setCurrentExpense} editExpense={editExpense}/>
        </div>
        <ExpenseForm addExpense={addExpense} currentExpense={currentExpense} setCurrentExpense={setCurrentExpense} editExpense={editExpense}/>
        <div className="expenseContainer">
          <ExpenseInfo expenses={expenses} />
          <ExpenseList expenses={expenses} deleteExpense={deleteExpense} changeExpenseToUpdate = {changeExpenseToUpdate } />
        </div>
      </div>
    </>
  );
}

export default App;
