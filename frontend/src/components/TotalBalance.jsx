import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TransactionContext } from "./context/TransactionContext";

const TotalBalance = () => {
  const {state, dispatch} = useContext(TransactionContext)
  const [balance, setBalance] = useState('$0')

  const handleExpense = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/transactions/"
      );
      dispatch({ type: "GET_TRANSACTIONS", payload: response.data });
      // console.log(response.data)
      return response.data;
      // setIncome(response.data.amount)
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { isLoading, error, data } = useQuery(
    ["balance"],
    handleExpense
  );
  
  // if(isLoading){
  //   return <div>$0</div>;
  // }

  useEffect(() => {
    if (data) {
      const incomeSpec = data.filter((spec) =>
        spec.specification.includes("Income")
      );
  
      const expenseSpec = data.filter((spec) =>
        spec.specification.includes("Expense")
      );
      const totalIncomeAmount = incomeSpec.reduce((total, income) => {
        return total + income.amount;
      }, 0);
  
      const totalExpenseAmount = expenseSpec.reduce((total, expense) => {
        return total + expense.amount;
      }, 0);
  
      setBalance(`$${totalIncomeAmount - totalExpenseAmount}`)
    }
  }, [data]);

  if (error){
    return <div>Error:{error.message}</div>
  }


  return (
    <div className="total-balance">
      <div className="section">
        <div className="-mb-2">
          <h1 className="-mb-6 font-normal text-sm  text-[#808080]">
            TOTAL BALANCE:
          </h1>
          <br />
          <h1 className="text-3xl font-bold ">{balance}</h1>
        </div>
      </div>
    </div>
  );
};

export default TotalBalance;
