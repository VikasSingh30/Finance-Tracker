import React from 'react';
import { BarChart3, PlusCircle, DollarSign, Target, TrendingUp } from 'lucide-react';

const Navigation = ({ currentView, setCurrentView, onCancelEdit }) => {
  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { key: 'add-transaction', label: 'Add Transaction', icon: PlusCircle },
    { key: 'transactions', label: 'Transactions', icon: DollarSign },
    { key: 'budgets', label: 'Budgets', icon: Target },
    { key: 'insights', label: 'Insights', icon: TrendingUp }
  ];

  const handleNavClick = (key) => {
    if (currentView === 'add-transaction') {
      onCancelEdit();
    }
    setCurrentView(key);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {navItems.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => handleNavClick(key)}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            currentView === key
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
};

export default Navigation;