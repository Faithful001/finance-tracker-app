import { useContext, useReducer, useState } from "react";
import { TransactionContext } from "./context/TransactionContext";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "./context/AuthContext";

const TransactionForm = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [specification, setSpecification] = useState("Income");
  const { dispatch } = useContext(TransactionContext);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);

  const [showIncomeRectangle, setShowIncomeRectangle] = useState(true);
  const [showExpenseRectangle, setShowExpenseRectangle] = useState(false);

  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    if (!user) {
      setError("You must be logged in");
      return;
    }
    try {
      const transaction = { description, amount, specification };
      const response = await axios.post(
        "http://localhost:4000/api/transactions/",
        transaction,
        {
          headers: {
            Authorization: `Bearer: ${user.token}`,
          },
        }
      );
      dispatch({ type: "CREATE_TRANSACTION", payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  //     .then((res) => {

  //       console.log(res.data);
  //       // setDescription("");
  //       // setAmount("");
  //       // setSpecification("");
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleIncomeClick = () => {
    setShowIncomeRectangle(true);
    setShowExpenseRectangle(false);
    setSpecification("Income");
  };

  const handleExpenseClick = () => {
    setShowIncomeRectangle(false);
    setShowExpenseRectangle(true);
    setSpecification("Expense");
  };

  const mutation = useMutation(
    handleSubmit,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("transaction");
        console.log("transaction added successfully");
      },
      onError: (err) => {
        console.log(err);
      },
    },
    {
      enabled: Boolean(user),
    }
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  // console.log({description, amount, specification})

  // const incomeSide =
  //   "absolute slider w-16 h-6 px-2 py-1.5 bg-neutral-50 rounded justify-start items-center gap-2.5 flex";
  // const expenseSide =
  //   "absolute slider left-[72px] w-16 h-6 px-2 py-1.5 bg-neutral-50 rounded justify-start items-center gap-2.5 flex";

  return (
    <div className="transaction-form">
      <div className="section">
        <h1 className="mb-3 text-[#1A1A1A] font-semibold">
          ADD NEW TRANSACTION
        </h1>
        <hr className="border-[0.1px] border-[#e0e0e0] mb-3" />
        <form
          className="mt-3 flex max-w-md flex-col items-center gap-4"
          onSubmit={handleFormSubmit}
        >
          {/* description */}
          <div>
            <input
              className="rounded w-[330px]"
              id="description"
              placeholder="Enter description"
              required
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* amount */}
          <div className="flex justify-center w-[250px]">
            <input
              className="rounded-md mr-3 w-[180px]"
              id="amount"
              placeholder="Amount ($)"
              required
              type="text"
              onChange={(e) => setAmount(e.target.value)}
            />
            {/* income/expense */}
            <div className="select flex flex-col relative top-[2px]">
              <div className="w-[140px] h-[37px] p-1 bg-gray-200 rounded justify-start items-center inline-flex">
                <p
                  className="text-zinc-600 text-[14px] font-bold ml-2 z-10 cursor-pointer"
                  onClick={() => handleIncomeClick()}
                >
                  Income
                </p>
                <p
                  className="text-zinc-600 text-[14px] font-bold ml-3 z-10 cursor-pointer"
                  onClick={() => handleExpenseClick()}
                >
                  Expense
                </p>

                {showIncomeRectangle && (
                  <div className="absolute slider w-16 h-6 px-2 py-1.5 bg-neutral-50 rounded justify-start items-center gap-2.5 flex transition-transform ease-in"></div>
                )}
                {showExpenseRectangle && (
                  <div className="absolute slider w-16 h-6 left-[72px] px-2 py-1.5 bg-neutral-50 rounded justify-start items-center gap-2.5 flex transition-transform ease-in"></div>
                )}
              </div>
            </div>
          </div>
          {mutation.isLoading ? (
            <button
              type="submit"
              className="bg-[#1A1A1A] hover:bg-[#444444] w-[330px] 5 p-2 rounded-md text-white"
            >
              Adding...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-[#1A1A1A] hover:bg-[#444444] w-[330px] 5 p-2 rounded-md text-white"
            >
              Add Transaction
            </button>
          )}
          {!user && <p className="text-red-600">Login to continue</p>}
          {error && <p className="text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
