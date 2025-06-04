// import React, { useState, useEffect } from 'react';
// import Header from './Header';
// import Navigation from './Navigation';
// import Dashboard from './Dashboard';
// import TransactionForm from './TransactionForm';
// import TransactionsList from './TransactionsList';
// import BudgetsView from './BudgetsView';
// import InsightsView from './InsightsView';
// import { CATEGORIES, CATEGORY_COLORS } from '../utils/constants';
// import { 
//   getMonthlyExpenses, 
//   getCategoryExpenses, 
//   getCurrentMonthExpenses, 
//   getBudgetComparison, 
//   getSpendingInsights 
// } from '../utils/dataProcessing';

// const PersonalFinanceTracker = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [budgets, setBudgets] = useState({});
//   const [currentView, setCurrentView] = useState('dashboard');
//   const [editingTransaction, setEditingTransaction] = useState(null);

//   // Initialize with in-memory storage (instead of localStorage)
//   useEffect(() => {
//     // Initialize with empty data - in a real Next.js app, you'd fetch from your MongoDB API
//     setTransactions([]);
//     setBudgets({});
//   }, []);

//   const handleAddTransaction = (transaction) => {
//     const newTransaction = {
//       id: Date.now(), // In real app, this would be MongoDB ObjectId
//       ...transaction,
//       amount: parseFloat(transaction.amount)
//     };
//     setTransactions(prev => [...prev, newTransaction]);
//   };

//   const handleUpdateTransaction = (updatedTransaction) => {
//     setTransactions(prev => 
//       prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
//     );
//     setEditingTransaction(null);
//   };

//   const handleDeleteTransaction = (id) => {
//     setTransactions(prev => prev.filter(t => t.id !== id));
//   };

//   const handleEditTransaction = (transaction) => {
//     setEditingTransaction(transaction);
//     setCurrentView('add-transaction');
//   };

//   const handleBudgetUpdate = (category, amount) => {
//     setBudgets(prev => ({
//       ...prev,
//       [category]: parseFloat(amount)
//     }));
//   };

//   const handleBudgetDelete = (category) => {
//     setBudgets(prev => {
//       const newBudgets = { ...prev };
//       delete newBudgets[category];
//       return newBudgets;
//     });
//   };

//   // Processed data
//   const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
//   const monthlyExpenses = getMonthlyExpenses(transactions);
//   const categoryExpenses = getCategoryExpenses(transactions);
//   const currentMonthExpenses = getCurrentMonthExpenses(transactions);
//   const budgetComparison = getBudgetComparison(transactions, budgets);
//   const insights = getSpendingInsights(transactions, budgets);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="container mx-auto px-4 py-8">
//         <Header />
        
//         <Navigation 
//           currentView={currentView} 
//           setCurrentView={setCurrentView}
//           onCancelEdit={() => setEditingTransaction(null)}
//         />

//         {currentView === 'dashboard' && (
//           <Dashboard
//             totalExpenses={totalExpenses}
//             currentMonthExpenses={currentMonthExpenses}
//             categoryExpenses={categoryExpenses}
//             monthlyExpenses={monthlyExpenses}
//             transactions={transactions}
//           />
//         )}

//         {currentView === 'add-transaction' && (
//           <TransactionForm
//             editingTransaction={editingTransaction}
//             onAddTransaction={handleAddTransaction}
//             onUpdateTransaction={handleUpdateTransaction}
//             onCancel={() => {
//               setEditingTransaction(null);
//               setCurrentView('dashboard');
//             }}
//           />
//         )}

//         {currentView === 'transactions' && (
//           <TransactionsList
//             transactions={transactions}
//             onEdit={handleEditTransaction}
//             onDelete={handleDeleteTransaction}
//           />
//         )}

//         {currentView === 'budgets' && (
//           <BudgetsView
//             budgets={budgets}
//             budgetComparison={budgetComparison}
//             onBudgetUpdate={handleBudgetUpdate}
//             onBudgetDelete={handleBudgetDelete}
//           />
//         )}

//         {currentView === 'insights' && (
//           <InsightsView
//             insights={insights}
//             budgetComparison={budgetComparison}
//             transactions={transactions}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default PersonalFinanceTracker;