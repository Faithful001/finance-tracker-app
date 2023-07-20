import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TransactionContext } from "./context/TransactionContext";
import { AuthContext } from "./context/AuthContext";

const TotalBalance = () => {
  const { dispatch } = useContext(TransactionContext);
  const { user } = useContext(AuthContext);

  const [balance, setBalance] = useState("$0");

  const handleExpense = async () => {
    try {
      if (user && user.token) {
        const response = await axios.get(
          "http://localhost:4000/api/transactions/",
          {
            headers: {
              Authorization: `Bearer: ${user.token}`,
            },
          }
        );
        dispatch({ type: "GET_TRANSACTIONS", payload: response.data });
        return response.data;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const query = useQuery(["balance"], handleExpense, {
    enabled: Boolean(user),
  });

  // if(isLoading){
  //   return <div>$0</div>;
  // }

  useEffect(() => {
    if (query.data) {
      const incomeSpec = query.data.filter((spec) =>
        spec.specification.includes("Income")
      );

      const expenseSpec = query.data.filter((spec) =>
        spec.specification.includes("Expense")
      );
      const totalIncomeAmount = incomeSpec.reduce((total, income) => {
        return total + income.amount;
      }, 0);

      const totalExpenseAmount = expenseSpec.reduce((total, expense) => {
        return total + expense.amount;
      }, 0);

      setBalance(`$${totalIncomeAmount - totalExpenseAmount}`);
    }
  }, [query.data, user]);

  // if (error) {
  //   return <h1 className="text-3xl font-bold ">$--</h1>;
  // }

  return (
    <div className="total-balance">
      <div className="section">
        <div className="-mb-2">
          <h1 className="-mb-6 font-normal text-sm  text-[#808080]">
            TOTAL BALANCE:
          </h1>
          <br />
          {query.error ? (
            <h1 className="text-3xl font-bold ">$--</h1>
          ) : (
            <h1 className="text-3xl font-bold ">{balance}</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalBalance;
