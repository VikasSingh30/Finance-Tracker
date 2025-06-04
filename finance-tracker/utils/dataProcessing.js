import { CATEGORY_COLORS } from './constants';

export const getMonthlyExpenses = (transactions) => {
  const monthlyData = {};
  transactions.forEach(transaction => {
    const month = new Date(transaction.date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
    monthlyData[month] = (monthlyData[month] || 0) + transaction.amount;
  });

  return Object.entries(monthlyData)
    .map(([month, amount]) => ({ month, amount }))
    .sort((a, b) => new Date(a.month + ' 1') - new Date(b.month + ' 1'))
    .slice(-6); // Last 6 months
};

export const getCategoryExpenses = (transactions) => {
  const categoryData = {};
  transactions.forEach(transaction => {
    categoryData[transaction.category] = (categoryData[transaction.category] || 0) + transaction.amount;
  });

  return Object.entries(categoryData).map(([category, amount]) => ({
    category,
    amount,
    color: CATEGORY_COLORS[category]
  }));
};

export const getCurrentMonthExpenses = (transactions) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate.getMonth() === currentMonth && 
           transactionDate.getFullYear() === currentYear;
  });
};

export const getBudgetComparison = (transactions, budgets) => {
  const currentMonthExpenses = getCurrentMonthExpenses(transactions);
  const categorySpending = {};
  
  currentMonthExpenses.forEach(transaction => {
    categorySpending[transaction.category] = (categorySpending[transaction.category] || 0) + transaction.amount;
  });

  return Object.entries(budgets).map(([category, budget]) => ({
    category,
    budget,
    spent: categorySpending[category] || 0,
    remaining: Math.max(0, budget - (categorySpending[category] || 0)),
    overBudget: (categorySpending[category] || 0) > budget
  }));
};

export const getSpendingInsights = (transactions, budgets) => {
  const currentMonthExpenses = getCurrentMonthExpenses(transactions);
  const totalCurrentMonth = currentMonthExpenses.reduce((sum, t) => sum + t.amount, 0);
  
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const lastMonthExpenses = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate.getMonth() === lastMonth.getMonth() && 
           transactionDate.getFullYear() === lastMonth.getFullYear();
  });
  const totalLastMonth = lastMonthExpenses.reduce((sum, t) => sum + t.amount, 0);

  const categoryExpenses = getCategoryExpenses(transactions);
  const topCategory = categoryExpenses.reduce((max, cat) => 
    cat.amount > (max?.amount || 0) ? cat : max, null
  );

  const budgetComparison = getBudgetComparison(transactions, budgets);
  const overBudgetCategories = budgetComparison.filter(b => b.overBudget);

  return {
    monthlyChange: totalLastMonth > 0 ? ((totalCurrentMonth - totalLastMonth) / totalLastMonth * 100) : 0,
    topSpendingCategory: topCategory?.category || 'N/A',
    overBudgetCount: overBudgetCategories.length,
    averageTransaction: currentMonthExpenses.length > 0 ? totalCurrentMonth / currentMonthExpenses.length : 0
  };
};