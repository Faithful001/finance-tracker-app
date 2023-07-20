import { TransactionContext } from "./context/TransactionContext";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";
import { API } from "../api/api";

const IncomeExpense = () => {
  const { dispatch } = useContext(TransactionContext);
  const [income, setIncome] = useState("$0");
  const [expense, setExpense] = useState("$0");
  const { user } = useContext(AuthContext);

  const handleTransactions = async () => {
    try {
      if (user && user.token) {
        const response = await axios.get(
          `${API.prodAPI}/api/transactions/`,
          {
            headers: {
              Authorization: `Bearer: ${user.token}`,
            },
          }
        );
        dispatch({ type: "GET_TRANSACTIONS", payload: response.data });
        // console.log(response.data)
        return response.data;
        // setIncome(response.data.amount)
      }
    } catch (error) {
      console.log(error);
      throw error;
      // setError(error)
    }
  };

  const { isLoading, error, data } = useQuery(
    ["incomeExpense"],
    handleTransactions,
    {
      enabled: Boolean(user),
    }
  );

  useEffect(() => {
    if (data) {
      const incomeSpec = data.filter((spec) =>
        spec.specification.includes("Income")
      );

      const totalIncomeAmount = incomeSpec.reduce((total, income) => {
        return total + income.amount;
      }, 0);

      setIncome(`$${totalIncomeAmount}`);

      const expenseSpec = data.filter((spec) =>
        spec.specification.includes("Expense")
      );

      const totalExpenseAmount = expenseSpec.reduce((total, expense) => {
        return total + expense.amount;
      }, 0);

      setExpense(`$${totalExpenseAmount}`);
    }
  }, [data]);

  if (error) {
    return (
      <div className="flex flex-col items-center">
        <div className="income-expense-wrapper flex items-center justify-center mt-6 border-2 w-full border-[#EBEBEB] rounded-md p-3">
          <div className="mr-5 ">
            <p className="-mb-7 text-center text-sm text-[#a1a1a1] font-medium">
              INCOME
            </p>
            <br />
            <h1 className="text-[#198049] text-2xl font-semibold ">--</h1>
          </div>
          <div className="mt-1 w-0.5 h-10 bg-[#e0e0e0]"></div>
          <div className="ml-5">
            <p className="-mb-7 text-center text-sm text-[#a1a1a1] font-medium">
              EXPENSE
            </p>
            <br />
            <h1 className="text-[#D92B2B] text-2xl font-semibold">--</h1>
          </div>
        </div>
      </div>
    );
  }

  // const incomeSpec = data
  //   ? data.filter((spec) => spec.specification.includes("Income"))
  //   : [];

  // const totalIncomeAmount = incomeSpec.reduce((total, income) => {
  //   return total + income.amount;
  // }, 0);

  // const expenseSpec = data
  //   ? data.filter((spec) => spec.specification.includes("Expense"))
  //   : [];

  // const totalExpenseAmount = expenseSpec.reduce((total, income) => {
  //   return total + income.amount;
  // }, 0);

  // setIncome(`$${totalIncomeAmount}`);
  // setIncome(`$${totalExpenseAmount}`);

  return (
    <div className="income-expense">
      <div className="section">
        <div className="flex flex-col items-center">
          <div className="income-expense-wrapper flex items-center justify-center mt-6 border-2 w-full border-[#EBEBEB] rounded-md p-3">
            <div className="mr-5 ">
              <p className="-mb-7 text-center text-sm text-[#a1a1a1] font-medium">
                INCOME
              </p>
              <br />
              <h1 className="text-[#198049] text-2xl font-semibold ">
                {income}
              </h1>
            </div>
            <div className="mt-1 w-0.5 h-10 bg-[#e0e0e0]"></div>
            <div className="ml-5">
              <p className="-mb-7 text-center text-sm text-[#a1a1a1] font-medium">
                EXPENSE
              </p>
              <br />
              <h1 className="text-[#D92B2B] text-2xl font-semibold">
                {expense}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpense;
