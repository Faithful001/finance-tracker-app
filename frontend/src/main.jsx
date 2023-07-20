import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TransactionContextProvider } from "./components/context/TransactionContext.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "./components/context/AuthContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <AuthContextProvider>
    <QueryClientProvider client={queryClient}>
      <TransactionContextProvider>
        <App />
      </TransactionContextProvider>
    </QueryClientProvider>
    </AuthContextProvider>
  // </React.StrictMode>
);
