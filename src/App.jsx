import { useState } from "react";
import AddExpense from "./Components/AddExpense"
import GraphExpense from "./Components/GraphExpense"
import ListExpense from "./Components/ListExpense"
import Header from "./Components/Header";
import './styles/App.css'

function App() {
  const [expenseList, setExpenseList] = useState([]);
  
  return (
    <div className="body">
     <Header />
     <AddExpense expenseList = {expenseList} setExpenseList={setExpenseList}/>
     <GraphExpense expenseList = {expenseList}/>
     <ListExpense expenseList = {expenseList} setExpenseList={setExpenseList}/> 
    </div>
  )
}

export default App
