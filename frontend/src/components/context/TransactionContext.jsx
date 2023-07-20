import { createContext, useReducer } from "react";

export const TransactionContext = createContext();

const INITIALSTATE = {
  transaction: null,
};

export const TransactionReducer = (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        transaction: action.payload,
      };
    case "GET_TRANSACTION":
      return {};
    case "CREATE_TRANSACTION":
      return {
        ...state,
        transaction: [action.payload, ...state.transaction],
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transaction: state.transaction.filter(
          (transaction) => transaction._id !== action.payload._id
        ),
      };
    case "UPDATE_TRANSACTION":
      const { transactionId, updatedContent } = action.payload;
      const updatedTransactions = state.transactions.map((transaction) => {
        if (transaction.id === transactionId) {
          return { ...transaction, ...updatedContent };
        }
        return transaction;
      });
      return {
        ...state,
        transactions: updatedTransactions,
      };
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TransactionReducer, INITIALSTATE);
  return (
    <TransactionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
};
