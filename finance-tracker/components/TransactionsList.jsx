"use client";
import React from 'react';
import { Edit2, Trash2, DollarSign } from 'lucide-react';
import { CATEGORY_COLORS } from '../utils/constants';

const TransactionsList = ({ transactions, onEdit, onDelete }) => {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Transactions</h2>
        <span className="text-sm text-gray-600">
          Total: {transactions.length} transactions
        </span>
      </div>
      
      {transactions.length > 0 ? (
        <div className="space-y-3">
          {sortedTransactions.map(transaction => (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: CATEGORY_COLORS[transaction.category] }}
                  ></div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-600">
                      {transaction.category} • {transaction.date}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-red-600">
                  ${transaction.amount.toFixed(2)}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(transaction)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit transaction"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete transaction"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No transactions yet</p>
          <p className="text-gray-400">Start by adding your first transaction!</p>
        </div>
      )}
    </div>
  );
};

export default TransactionsList;