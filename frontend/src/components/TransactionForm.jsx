import { useContext, useReducer, useState } from "react";
import { TransactionContext } from "./context/TransactionContext";
import axios from "axios";

const TransactionForm = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [specification, setSpecification] = useState("Income");
  const { state, dispatch } = useContext(TransactionContext);

  const transaction = { description, amount, specification };

  const [showIncomeRectangle, setShowIncomeRectangle] = useState(true);
  const [showExpenseRectangle, setShowExpenseRectangle] = useState(false);

  const handleSubmit = () => {
    // e.preventDefault();
    axios
      .post("http://localhost:4000/api/transactions/", transaction)
      .then((res) => {
        dispatch({ type: "CREATE_TRANSACTION", payload: res.data });
        console.log(res.data);
        setDescription("");
        setAmount("");
        setSpecification("");
      })
      .catch((err) => console.log(err));
  };

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
          onSubmit={() => handleSubmit()}
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

                {/* <div className="absolute slider w-16 h-6 left-[72px] px-2 py-1.5 bg-neutral-50 rounded justify-start items-center gap-2.5 flex"></div> */}
              </div>
            </div>

            {/* <div className="select flex flex-col relative top-[2px]">
              <div className="w-[140px] h-[37px] p-1 bg-gray-200 rounded justify-start items-center inline-flex">
                <div className="slider px-2 py-1.5 bg-neutral-50 rounded justify-start items-center gap-2.5 flex">
                  <div className="text-zinc-600 text-[14px] font-bold">
                    Income
                  </div>
                </div>
                <div className="px-2 py-1.5 rounded justify-start items-center gap-2.5 flex">
                  <div className="text-zinc-500 text-[14px] font-normal">
                    Expense
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <button
            type="submit"
            className="bg-[#1A1A1A] hover:bg-[#444444] w-[330px] 5 p-2 rounded-md text-white"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
