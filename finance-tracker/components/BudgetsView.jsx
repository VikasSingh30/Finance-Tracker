"use client";
import React, { useState } from 'react';
import { Edit2, Trash2, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CATEGORIES, CATEGORY_COLORS } from '../utils/constants';

const BudgetsView = ({ budgets, budgetComparison, onBudgetUpdate, onBudgetDelete }) => {
  const [budgetFormData, setBudgetFormData] = useState({
    category: '',
    amount: ''
  });
  const [editingBudget, setEditingBudget] = useState(null);

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    if (!budgetFormData.category || !budgetFormData.amount || parseFloat(budgetFormData.amount) <= 0) {
      return;
    }

    onBudgetUpdate(budgetFormData.category, budgetFormData.amount);
    setBudgetFormData({ category: '', amount: '' });
    setEditingBudget(null);
  };

  const handleEditBudget = (category) => {
    setEditingBudget(category);
    setBudgetFormData({
      category,
      amount: budgets[category].toString()
    });
  };

  const handleDeleteBudget = (category) => {
    onBudgetDelete(category);
    if (editingBudget === category) {
      setEditingBudget(null);
      setBudgetFormData({ category: '', amount: '' });
    }
  };

  const availableCategories = CATEGORIES.filter(cat => 
    !budgets[cat] || cat === editingBudget
  );

  return (
    <div className="space-y-8">
      {/* Add Budget Form */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {editingBudget ? 'Edit Budget' : 'Set Monthly Budget'}
        </h2>
        
        <form onSubmit={handleBudgetSubmit} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={budgetFormData.category}
              onChange={(e) => setBudgetFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={editingBudget}
            >
              <option value="">Select Category</option>
              {availableCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Budget
            </label>
            <input
              type="number"
              step="0.01"
              value={budgetFormData.amount}
              onChange={(e) => setBudgetFormData(prev => ({ ...prev, amount: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {editingBudget ? 'Update' : 'Set Budget'}
            </button>
            {editingBudget && (
              <button
                type="button"
                onClick={() => {
                  setEditingBudget(null);
                  setBudgetFormData({ category: '', amount: '' });
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Budget vs Actual Chart */}
      {budgetComparison.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Budget vs Actual (This Month)
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={budgetComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value.toFixed(2)}`, '']} />
              <Bar dataKey="budget" fill="#E5E7EB" name="Budget" />
              <Bar dataKey="spent" fill="#3B82F6" name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Budget List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Budgets</h3>
        
        {Object.keys(budgets).length > 0 ? (
          <div className="space-y-4">
            {budgetComparison.map(budget => (
              <div key={budget.category} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: CATEGORY_COLORS[budget.category] }}
                    ></div>
                    <h4 className="font-medium text-gray-900">{budget.category}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditBudget(budget.category)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit budget"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteBudget(budget.category)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete budget"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Budget</p>
                    <p className="font-semibold">${budget.budget.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Spent</p>
                    <p className={`font-semibold ${budget.overBudget ? 'text-red-600' : 'text-gray-900'}`}>
                      ${budget.spent.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Remaining</p>
                    <p className={`font-semibold ${budget.overBudget ? 'text-red-600' : 'text-green-600'}`}>
                      ${budget.overBudget ? '0.00' : budget.remaining.toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        budget.overBudget ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min(100, (budget.spent / budget.budget) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                {budget.overBudget && (
                  <Alert className="mt-3">
                    <AlertDescription className="text-red-600">
                      Over budget by ${(budget.spent - budget.budget).toFixed(2)}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No budgets set</p>
            <p className="text-gray-400">Start by setting your first monthly budget!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetsView;