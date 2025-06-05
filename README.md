# 📊 Finance Tracker

---

### 🚀 Deployment

👉 [Finance Tracker](https://finance-tracker-coral-mu.vercel.app/)


---

## 🚀 Project Overview

A **Personal Finance Tracker** web app built with **Next.js** and **React** that helps you:

- Track your transactions with categories and descriptions
- Set and manage budgets for different spending categories
- Visualize your spending trends with dashboards and insights
- Persist your data locally in the browser (localStorage)
- Easily add, edit, and delete transactions and budgets

---

## 🛠️ Technologies & Packages Used

| Package           | Purpose                                        |
| ----------------- | ----------------------------------------------|
| `next`            | React framework for server-rendered apps      |
| `react`           | UI library for building user interfaces        |
| `typescript`      | Adds static type checking (if using TS)        |
| `tailwindcss`     | Utility-first CSS framework for styling         |
| `recharts`        | Charting library for dashboards & visualizations|
| `clsx`            | Utility for conditional classNames              |

---

## 🔍 Project Structure
/app<br>                   
  ├─ page.tsx[Main page & logic]<br>
/components<br>            
  ├─ Header.tsx[Header component]<br>
  ├─ Navigation.tsx[Navigation bar]<br>
  ├─ Dashboard.tsx[Dashboard visualization]<br>
  ├─ TransactionForm.tsx[Add/edit transaction form]<br>
  ├─ TransactionsList.tsx[List of transactions]<br>
  ├─ BudgetsView.tsx[Budget management UI]<br>
  └─ InsightsView.tsx[Insights & analysis]<br>
/utils<br>                 
  ├─ sampledata.ts[Sample transactions & budgets]<br>
  ├─ constants.ts[Categories & color constants]<br>
  └─ dataProcessing.ts[Helper functions for data calculations]<br>

---

### 💾 Persistence
The app persists transactions and budgets in the browser's localStorage, so your data stays saved between sessions.

### 🎨 Styling
Styled with Tailwind CSS for rapid and responsive design.

### 📊 Visualization
Uses Recharts for beautiful charts and data visualization.

### 🙌 Contributing
Feel free to open issues or submit pull requests for improvements!

---

## 📝 Notes

This app is for demonstration purposes and does not include authentication or backend storage.<br>
To extend, consider integrating a backend database for real user data.<br>

