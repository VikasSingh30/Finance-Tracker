import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const ChartsSection = ({ monthlyExpenses, categoryExpenses }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Monthly Expenses Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Expenses</h3>
        {monthlyExpenses.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyExpenses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
              <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-500">
            No expense data available
          </div>
        )}
      </div>

      {/* Category Pie Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Expenses by Category</h3>
        {categoryExpenses.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={categoryExpenses}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="amount"
                label={({ category, percent }) => `${category} (${(percent * 100).toFixed(0)}%)`}
              >
                {categoryExpenses.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
            </RechartsPieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-500">
            No category data available
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartsSection;