import React, { useState } from 'react';
import '../styles/ListExpense.css';

const ListExpense = ({ expenseList, setExpenseList }) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedExpense, setEditedExpense] = useState({});

    const openEditModal = (expense) => {
        setEditedExpense({ ...expense });
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditedExpense({});
        setEditModalOpen(false);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedExpense(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedList = expenseList.map(expense => {
            if (expense.id === editedExpense.id) {
                return editedExpense;
            }
            return expense;
        });
        setExpenseList(updatedList);
        closeEditModal();
    };

    // Sort the expenseList based on the date in ascending order
    const sortedExpenseList = expenseList.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Function to group expenses by month
    const groupExpensesByMonth = () => {
        const groupedExpenses = {};
        sortedExpenseList.forEach((expense) => {
            const date = new Date(expense.date);
            const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
            //console.log(monthYear);
            if (!groupedExpenses[monthYear]) {
                groupedExpenses[monthYear] = [];
            }
            groupedExpenses[monthYear].push(expense);
        });
        
        return groupedExpenses;
    };

    const handleDelete = (id) => {
        const updatedList = expenseList.filter(expense => expense.id !== id);
        setExpenseList(updatedList);
    };

    // Group expenses by month
    const groupedExpenses = groupExpensesByMonth();
    const monthsInReverseOrder = Object.keys(groupedExpenses).sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateB - dateA; // Sort in descending order
      });
    return (
        <div>
        <h3 className='headingg'>Expenses</h3>
        <div className='expense-list'>
            {expenseList.length === 0 ? (
                <p className='no'>No expenses</p>
            ) : (
                monthsInReverseOrder.map((monthYear) => (
                    <div key={monthYear}>
                        <h4 className='monthName'>{monthYear}</h4>
                        <ul>
                            {groupedExpenses[monthYear].map((expense) => (
                                <div className='list' key={expense.id}>
                                <li className='expense-card'>
                                    <div>
                                        {expense.date} {expense.title}
                                    </div>
                                    <div className='list-right'>
                                        <div>Rs. {expense.amount}</div>
                                        <button onClick={() => handleDelete(expense.id)} className='delete-button'>Delete</button>
                                        <button onClick={() => openEditModal(expense)} className='delete-button'>Edit</button>
                                    </div>
                                </li>
                                </div>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
        {editModalOpen && (
            <div className='edit-modal'>
                <form onSubmit={handleEditSubmit}>
                    <label>Date:</label>
                    <input type='date' name='date' value={editedExpense.date} onChange={handleEditChange} />
                    <label>Title:</label>
                    <input type='text' name='title' value={editedExpense.title} onChange={handleEditChange} />
                    <label>Amount:</label>
                    <input type='number' name='amount' value={editedExpense.amount} onChange={handleEditChange} />
                    <button type='submit'>Save</button>
                    <button type='button' onClick={closeEditModal}>Cancel</button>
                </form>
            </div>
        )}
    </div>
    
    );
};

export default ListExpense;
