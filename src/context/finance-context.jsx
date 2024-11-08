import React, { createContext, useState, useContext } from 'react';

const FinanceContext = createContext();

export const useFinanceContext = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinanceContext must be used within a FinanceProvider');
  }
  return context;
};

export const FinanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const addFunds = (amount) => {
    setBalance(prevBalance => prevBalance + amount);
    addTransaction('Depósito', amount);
  };

  const makePayment = (amount, loanId, description) => {
    if (balance >= amount) {
      setBalance(prevBalance => prevBalance - amount);
      addTransaction(`Pago: ${description}`, -amount, loanId);
      return true;
    }
    return false;
  };

  const addTransaction = (type, amount, loanId = null) => {
    const newTransaction = {
      id: Date.now().toString(),
      type,
      amount,
      date: new Date(),
      loanId
    };
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
  };

  return (
    <FinanceContext.Provider value={{ 
      balance, 
      transactions, 
      addFunds, 
      makePayment 
    }}>
      {children}
    </FinanceContext.Provider>
  );
};