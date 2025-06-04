import React from 'react';

const RecentTransactions = ({ transactions }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h3>
      {transactions.length > 0 ? (
        <div className="space-y-3">
          {transactions.slice(-5).reverse().map(transaction => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-600">{transaction.category} • {transaction.date}</p>
              </div>
              <span className="font-semibold text-red-600">${transaction.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">No transactions yet. Start by adding your first transaction!</p>
      )}
    </div>
  );
};

export default RecentTransactions;