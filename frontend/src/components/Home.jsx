import IncomeExpense from "./IncomeExpense";
import TotalBalance from "./TotalBalance";
import TransactionForm from "./TransactionForm";
import TransactionHistory from "./TransactionHistory";
import {Link} from "react-router-dom"

const Home = () => {
  return (
    <div className="home w-[30rem] h-screen pb-5 px-[10px] bg-white">
      <div className="section mx-16">
        <div className="header flex items-center justify-between">
        <h1 className="font-semibold mb-5 flex pt-4 flex-col items-center text-lg">
          Finance Tracker
        </h1>
        {/* <Link to="/login"> */}
        <p className="mb-1 underline text-sm text-slate-400 cursor-pointer">Log out</p>
        {/* </Link> */}
        </div>
        <TotalBalance/>
        <IncomeExpense/>
        <TransactionHistory/>
        <TransactionForm/>
       




      </div>
    </div>
  );
};

export default Home;
