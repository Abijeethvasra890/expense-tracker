import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import '../styles/AddExpense.css'

const AddExpense = ({expenseList, setExpenseList}) => {

    const [expense, setExpense] = useState({
        title: "",
        amount: "",
        date: ""
    })
   
    const handleInputChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setExpense({...expense, [name]: value});
    }

    const handleAddExpense = (event) =>{
        event.preventDefault();
        if (!expense.title || !expense.amount) {
            alert('Title and Amount are requiured fields');
            return;
        }if(!expense.date){
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1; 
            const day = currentDate.getDate();
            expense.date = `${year}-${month}-${day}`; //YYYY-MM-DD
        }
        const id = uuidv4();
        const newExpense = {...expense , id};
        setExpenseList([...expenseList, newExpense]);
        //console.log("Added expense");
        setExpense({
            title: '',
            amount: '',
            date: ''
        });
    }

  return (
    <>
        <form className='expense-input' onSubmit={handleAddExpense}>
            <div className='form-row-1'>
                <input 
                    placeholder='Title'
                    type='text'
                    name='title'
                    value={expense.title}
                    onChange={handleInputChange}
                    className='inputField'
                    />
                <input 
                    placeholder='Expense'
                    type='number'
                    name='amount'
                    value={expense.amount}
                    onChange={handleInputChange}
                    className='inputField'
                    />
                    <input 
                    placeholder='Date'
                    type='date'
                    name='date'
                    value={expense.date}
                    onChange={handleInputChange}
                    className='inputField'
                    />
            </div>
            <div className='form-row-2'>
                <button className='addexpense-button' type='submit'>Add Expense</button>
            </div>
        </form>
    </>
  )
}

export default AddExpense