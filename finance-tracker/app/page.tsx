"use client";

import React, { useState, useEffect } from 'react';
import { SAMPLE_TRANSACTIONS, SAMPLE_BUDGETS } from '../utils/sampledata';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Dashboard from '../components/Dashboard';
import TransactionForm from '../components/TransactionForm';
import TransactionsList from '../components/TransactionsList';
import BudgetsView from '../components/BudgetsView';
import InsightsView from '../components/InsightsView';
import { 
  getMonthlyExpenses, 
  getCategoryExpenses, 
  getCurrentMonthExpenses, 
  getBudgetComparison, 
  getSpendingInsights 
} from '../utils/dataProcessing';

type Transaction = {
  id: number;
  name: string;
  amount: number;
  category: string;
  date?: string;
};

type Budgets = {
  [category: string]: number;
};

const STORAGE_KEYS = {
  transactions: 'financeApp_transactions',
  budgets: 'financeApp_budgets',
};

const FinanceTracker = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budgets>({});
  const [currentView, setCurrentView] = useState<'dashboard' | 'add-transaction' | 'transactions' | 'budgets' | 'insights'>('dashboard');
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const storedTransactions = localStorage.getItem(STORAGE_KEYS.transactions);
    const storedBudgets = localStorage.getItem(STORAGE_KEYS.budgets);

    setTransactions(storedTransactions ? JSON.parse(storedTransactions) : SAMPLE_TRANSACTIONS);
    setBudgets(storedBudgets ? JSON.parse(storedBudgets) : SAMPLE_BUDGETS);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.budgets, JSON.stringify(budgets));
  }, [budgets]);

  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      ...transaction,
      amount: parseFloat(transaction.amount.toString()),
    };
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setCurrentView('add-transaction');
  };

  const handleBudgetUpdate = (category: string, amount: number) => {
    setBudgets((prev) => ({
      ...prev,
      [category]: parseFloat(amount.toString()),
    }));
  };

  const handleBudgetDelete = (category: string) => {
    setBudgets((prev) => {
      const newBudgets = { ...prev };
      delete newBudgets[category];
      return newBudgets;
    });
  };

  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  const monthlyExpenses = getMonthlyExpenses(transactions);
  const categoryExpenses = getCategoryExpenses(transactions);
  const currentMonthExpenses = getCurrentMonthExpenses(transactions);
  const budgetComparison = getBudgetComparison(transactions, budgets);
  const insights = getSpendingInsights(transactions, budgets);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <Navigation
          currentView={currentView}
          setCurrentView={setCurrentView}
          onCancelEdit={() => setEditingTransaction(null)}
        />

        {currentView === 'dashboard' && (
          <Dashboard
            totalExpenses={totalExpenses}
            currentMonthExpenses={currentMonthExpenses}
            categoryExpenses={categoryExpenses}
            monthlyExpenses={monthlyExpenses}
            transactions={transactions}
          />
        )}

        {currentView === 'add-transaction' && (
          <TransactionForm
            editingTransaction={editingTransaction}
            onAddTransaction={handleAddTransaction}
            onUpdateTransaction={handleUpdateTransaction}
            onCancel={() => {
              setEditingTransaction(null);
              setCurrentView('dashboard');
            }}
          />
        )}

        {currentView === 'transactions' && (
          <TransactionsList
            transactions={transactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
        )}

        {currentView === 'budgets' && (
          <BudgetsView
            budgets={budgets}
            budgetComparison={budgetComparison}
            onBudgetUpdate={handleBudgetUpdate}
            onBudgetDelete={handleBudgetDelete}
          />
        )}

        {currentView === 'insights' && (
          <InsightsView
            insights={insights}
            budgetComparison={budgetComparison}
            transactions={transactions}
          />
        )}
      </div>
    </div>
  );
};

export default FinanceTracker;
