import React from 'react';
import { TrendingUp, TrendingDown, PieChart, Target, DollarSign } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CATEGORY_COLORS } from '../utils/constants';

const InsightsView = ({ insights, budgetComparison, transactions }) => {
  const insightCards = [
    {
      title: 'Monthly Change',
      value: `${insights.monthlyChange >= 0 ? '+' : ''}${insights.monthlyChange.toFixed(1)}%`,
      icon: insights.monthlyChange >= 0 ? TrendingUp : TrendingDown,
      color: insights.monthlyChange >= 0 ? 'text-red-600' : 'text-green-600'
    },
    {
      title: 'Top Category',
      value: insights.topSpendingCategory,
      icon: PieChart,
      color: 'text-purple-600'
    },
    {
      title: 'Over Budget',
      value: insights.overBudgetCount,
      icon: Target,
      color: 'text-red-600'
    },
    {
      title: 'Avg Transaction',
      value: `${insights.averageTransaction.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-blue-600'
    }
  ];

  const getInsightAlerts = () => {
    const alerts = [];

    if (insights.monthlyChange > 10) {
      alerts.push({
        icon: TrendingUp,
        message: `Your spending increased by ${insights.monthlyChange.toFixed(1)}% this month. Consider reviewing your expenses.`,
        type: 'warning'
      });
    }

    if (insights.monthlyChange < -10) {
      alerts.push({
        icon: TrendingDown,
        message: `Great job! Your spending decreased by ${Math.abs(insights.monthlyChange).toFixed(1)}% this month.`,
        type: 'success'
      });
    }

    if (insights.overBudgetCount > 0) {
      alerts.push({
        icon: Target,
        message: `You're over budget in ${insights.overBudgetCount} ${insights.overBudgetCount === 1 ? 'category' : 'categories'}.`,
        type: 'warning'
      });
    }

    if (insights.topSpendingCategory !== 'N/A') {
      alerts.push({
        icon: PieChart,
        message: `Your highest spending category is ${insights.topSpendingCategory}.`,
        type: 'info'
      });
    }

    if (transactions.length === 0) {
      alerts.push({
        icon: DollarSign,
        message: 'Start tracking your expenses to get personalized insights.',
        type: 'info'
      });
    }

    return alerts;
  };

  const alerts = getInsightAlerts();

  return (
    <div className="space-y-8">
      {/* Key Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insightCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className={`text-2xl font-bold ${
                  card.title === 'Monthly Change' ? card.color : 'text-gray-900'
                }`}>
                  {card.value}
                </p>
              </div>
              <card.icon className={`w-8 h-8 ${card.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Spending Insights */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Spending Insights</h3>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <Alert key={index} className={`${
              alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
              alert.type === 'success' ? 'border-green-200 bg-green-50' :
              'border-blue-200 bg-blue-50'
            }`}>
              <alert.icon className="h-4 w-4" />
              <AlertDescription className={
                alert.type === 'warning' ? 'text-yellow-800' :
                alert.type === 'success' ? 'text-green-800' :
                'text-blue-800'
              }>
                {alert.message}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>

      {/* Budget Performance */}
      {budgetComparison.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgetComparison.map(budget => (
              <div 
                key={budget.category} 
                className={`p-4 rounded-lg border-2 ${
                  budget.overBudget ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: CATEGORY_COLORS[budget.category] }}
                  ></div>
                  <h4 className="font-medium">{budget.category}</h4>
                </div>
                <p className={`text-sm ${budget.overBudget ? 'text-red-600' : 'text-green-600'}`}>
                  {budget.overBudget ? 'Over Budget' : 'On Track'}
                </p>
                <p className="text-xs text-gray-600">
                  ${budget.spent.toFixed(2)} / ${budget.budget.toFixed(2)}
                </p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        budget.overBudget ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(100, (budget.spent / budget.budget) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsView;