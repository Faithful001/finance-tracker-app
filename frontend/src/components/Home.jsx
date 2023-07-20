import { useContext } from "react";
import IncomeExpense from "./IncomeExpense";
import TotalBalance from "./TotalBalance";
import TransactionForm from "./TransactionForm";
import TransactionHistory from "./TransactionHistory";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { TransactionContext } from "./context/TransactionContext";

const Home = () => {
  const { dispatch: transactionDispatch } = useContext(TransactionContext);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    transactionDispatch({type: "GET_TRANSACTIONS", payload: null})
    navigate("/login");
  };

  return (
    <div className="home w-[30rem] pb-5 px-[10px] bg-white">
      <div className="section mx-16">
        <div className="header flex items-center justify-between">
          <h1 className="font-semibold mb-5 flex pt-4 flex-col items-center text-lg">
            Finance Tracker
          </h1>
          {/* <Link to="/login"> */}

          {user ? (
            <p className="mb-1 text-sm text-slate-400">
              {user.email}
            </p>
          ) : (
            <Link to="/login">
              <button className="mb-1 float-right underline text-sm text-slate-400 cursor-pointer">
                Login
              </button>
            </Link>
          )}
          {/* </Link> */}
        </div>
        <TotalBalance />
        <IncomeExpense />
        <TransactionHistory />
        <TransactionForm />
        {user && (
          <p
            className="mb-1 mt-5 float-right underline text-sm text-slate-400 cursor-pointer"
            onClick={logout}
          >
            Log out
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
