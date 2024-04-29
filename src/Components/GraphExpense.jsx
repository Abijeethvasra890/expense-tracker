import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart, { plugins } from 'chart.js/auto';
import '../styles/GraphExpense.css';
import { color } from 'chart.js/helpers';

const GraphExpense = ({ expenseList }) => {
    const [monthlyExpenses, setMonthlyExpenses] = useState({});

    useEffect(() => {
        const calculateMonthlyExpenses = () => {
            const monthlyExpensesData = {};
            // Iterate over the expenseList to calculate monthly expenses
            expenseList.forEach(expense => {
                const date = new Date(expense.date);
                const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
                const year = date.getFullYear();
                const key = `${year}-${month}`;

                // If the key (month-year) doesn't exist, initialize it with the expense amount
                if (!monthlyExpensesData[key]) {
                    monthlyExpensesData[key] = 0;
                }

                // Add the expense amount to the corresponding month
                monthlyExpensesData[key] += parseFloat(expense.amount);
            });

            setMonthlyExpenses(monthlyExpensesData);
        };

        calculateMonthlyExpenses();
    }, [expenseList]);

    // Sort labels and data in descending order
    const sortedLabels = Object.keys(monthlyExpenses).sort((a, b) => new Date(b) - new Date(a));
    const sortedData = sortedLabels.map(label => monthlyExpenses[label]);

    const data = {
        labels: sortedLabels,
        datasets: [
            {
                label: 'Monthly Expenses',
                backgroundColor: 'rgba(0, 98, 102,1.0)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: sortedData,
            },
        ],
    };

    return (
        <>
            <div className='graph-header'>Expense Graph</div>
            <div className='graph-container'>
                <Bar
                    data={data}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Month',
                                    color: 'black'
                                },
                                ticks:{
                                    color: 'black'
                                },
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Expense Amount',
                                    color: 'black'
                                },
                                ticks:{
                                    color: 'black'
                                },
                                grid: {
                                    color: 'gray' 
                                }
                            },
                        },
                    }}
                />
            </div>
        </>
    );
};

export default GraphExpense;
