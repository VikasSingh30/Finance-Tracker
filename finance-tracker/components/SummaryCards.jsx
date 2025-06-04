import React from 'react';
import { DollarSign, TrendingUp, PieChart } from 'lucide-react';

const SummaryCards = ({ totalExpenses, currentMonthTotal, categoryCount }) => {
  const cards = [
    {
      title: 'Total Expenses',
      value: `$${totalExpenses.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-blue-600'
    },
    {
      title: 'This Month',
      value: `$${currentMonthTotal.toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Categories',
      value: categoryCount,
      icon: PieChart,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
            <card.icon className={`w-8 h-8 ${card.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;