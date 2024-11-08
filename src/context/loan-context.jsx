import React, { createContext, useState, useContext } from 'react';

const LoanContext = createContext();

export const useLoanContext = () => useContext(LoanContext);

export const LoanProvider = ({ children }) => {
  const [loanApplications, setLoanApplications] = useState([]);

  const addLoanApplication = (newApplication) => {
    setLoanApplications(prevApplications => [
      ...prevApplications,
      { 
        ...newApplication, 
        id: Date.now().toString(), 
        status: 'pending',
        remainingBalance: newApplication.amount,
        nextPaymentDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      }
    ]);
  };

  const updateLoanStatus = (id, status) => {
    setLoanApplications(prevApplications =>
      prevApplications.map(app =>
        app.id === id ? { ...app, status } : app
      )
    );
  };

  const updateLoanBalance = (id, amountPaid) => {
    setLoanApplications(prevApplications =>
      prevApplications.map(app =>
        app.id === id ? { 
          ...app, 
          remainingBalance: app.remainingBalance - amountPaid,
          nextPaymentDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Update next payment due date
        } : app
      )
    );
  };

  const calculateFee = (loan) => {
    // Simple interest calculation for demonstration
    const monthlyInterestRate = loan.interestRate / 12 / 100;
    const fee = loan.remainingBalance * monthlyInterestRate;
    return parseFloat(fee.toFixed(2));
  };

  const getLoanById = (id) => {
    console.log('getLoanById - searching for id:', id); // Debugging line
    console.log('getLoanById - all loans:', loanApplications); // Debugging line
    return loanApplications.find(app => app.id === id);
  };

  return (
    <LoanContext.Provider value={{ 
      loanApplications, 
      addLoanApplication, 
      updateLoanStatus,
      
      updateLoanBalance,
      calculateFee,
      getLoanById
    }}>
      {children}
    </LoanContext.Provider>
  );
};