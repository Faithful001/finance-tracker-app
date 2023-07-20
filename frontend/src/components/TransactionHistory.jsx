import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { TransactionContext } from "./context/TransactionContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "./context/AuthContext";
import { API } from "../api/api";

const TransactionHistory = () => {
  const { dispatch } = useContext(TransactionContext);
  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const clearTransactions = async () => {
    if (!user) {
      setError("You must be logged in");
      return;
    }
    if (user && user.token) {
      try {
        const response = await axios.delete(
          `${API.prodAPI}/api/transactions/`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        dispatch({type: "DELETE_TRANSACTION", payload: response.data})
        if (response.status === 200) {
          console.log("All transactions deleted successfully");
          return response.data;
        } else {
          throw new Error("An unexpected error occured");
        }
      } catch (error) {
        console.log(error);
      }
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
      if (user && user.token) {
        const response = await axios.get(
          `${API.prodAPI}/api/transactions/`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log("Response data:", response.data);
        dispatch({ type: "GET_TRANSACTIONS", payload: response.data });
        return response.data;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { isLoading, error, data } = useQuery(
    ["myTransactions"],
    getTransactions,
    {
      enabled: Boolean(user),
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p className="text-[#1A1A1A] font-semibold">--</p>;
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
          {!user && <div></div>}
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
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
