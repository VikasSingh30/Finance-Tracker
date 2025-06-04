import React from 'react';
import { DollarSign, TrendingUp, PieChart } from 'lucide-react';
import SummaryCards from './SummaryCards';
import ChartsSection from './ChartsSection';
import RecentTransactions from './RecentTransactions';

const Dashboard = ({
  totalExpenses,
  currentMonthExpenses,
  categoryExpenses,
  monthlyExpenses,
  transactions
}) => {
  const currentMonthTotal = currentMonthExpenses.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-8">
      <SummaryCards
        totalExpenses={totalExpenses}
        currentMonthTotal={currentMonthTotal}
        categoryCount={categoryExpenses.length}
      />
      
      <ChartsSection
        monthlyExpenses={monthlyExpenses}
        categoryExpenses={categoryExpenses}
      />
      
      <RecentTransactions transactions={transactions} />
    </div>
  );
};

export default Dashboard;