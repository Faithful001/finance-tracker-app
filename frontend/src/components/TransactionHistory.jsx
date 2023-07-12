import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { TransactionContext } from "./context/TransactionContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const TransactionHistory = () => {
  const { state, dispatch } = useContext(TransactionContext);
  // const [green, setGreen] = useState("Income")
  // const [red, setRed] = useState("Expense")

  const queryClient = useQueryClient();

  const clearTransactions = async () => {
    const response = await axios.delete(
      "http://localhost:4000/api/transactions/"
    );
    if (response.status === 200) {
      console.log("All transactions deleted successfully");
      return response.data;
    } else {
      throw new Error("An unexpected error occured");
    }
  };

  const { mutate } = useMutation(clearTransactions, {
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
      console.log("All transaction delete successfully");
    },
    onError: (err) => {
      console.log("An error occured", err);
    },
  });

  const handleClearTransactions = () => {
    mutate();
  };

  // const handleClearTransactions = async() => {
  //   try{
  //     const response = await axios.delete("http://localhost:4000/api/transactions/")
  //     if ( response.status === 200){
  //       console.log("All transactions deleted successfully")
  //       response.data
  //     }
  //   }catch(err){
  //     console.log(err)
  //   }
  // };

  const getTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/transactions/"
      );
      dispatch({ type: "GET_TRANSACTIONS", payload: response.data });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { isLoading, error, data } = useQuery(
    ["myTransactions"],
    getTransactions
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="transaction-history">
      <div className="section">
        <div className="mt-6 mb-6">
          <div className="flex justify-between mb-3">
            <p className="text-[#1A1A1A] font-semibold">HISTORY</p>
            <button
              className="text-[#B3B3B3] text-sm"
              onClick={handleClearTransactions}
            >
              Clear All
            </button>
          </div>
          <hr className="border-[0.1px] border-[#e0e0e0] mb-3" />
          <div className="mb-5">
            <p className="text-[#1A1A1A] font-semibold">Today</p>
          </div>
          {data &&
            data.map((transaction) => (
              <div key={transaction._id}>
                <div className="post1 flex justify-between mb-5">
                  <p className="text-[#1A1A1A] font-semibold">
                    {transaction.description}
                  </p>
                  <div className="flex relative">
                    <p className="text-[#1A1A1A] font-semibold mr-1">
                      ${transaction.amount}
                    </p>
                    {transaction.specification === "Income" ? (
                      <div className="mt-2 w-2 h-2 bg-[#198049] rounded-md"></div>
                    ) : transaction.specification === "Expense" ? (
                      <div className="mt-2 w-2 h-2 bg-[#D92B2B] rounded-md"></div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}

          {/* <div className="post2 flex justify-between mb-5">
            <p className="text-[#1A1A1A] font-semibold">Netflix subscription</p>
            <div className="flex relative">
              <p className="text-[#1A1A1A] font-semibold mr-1">-$800</p>
              <div className="mt-2 w-2 h-2 bg-[#D92B2B] rounded-md"></div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
