import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const NotLoggedIn = () => {
  return (
    <div className="notloggedin">
      <div className="section">
        {/* header */}
        <div className="home w-[30rem] h-screen pb-5 px-[10px] bg-white flex">
          <div className="section mx-16">
            <div className="header items-center justify-between">
              <h1 className="font-semibold mb-5 mr-20 flex pt-4 flex-col items-center text-lg">
                Finance Tracker
              </h1>

              {/* total balance */}
              <div className="-mb-2">
                <h1 className="-mb-6 font-normal text-sm  text-[#808080]">
                  TOTAL BALANCE:
                </h1>
                <br />
                <h1 className="text-3xl font-bold ">--</h1>
              </div>

              {/* income-expense */}
              <div className="flex flex-col items-center">
                <div className="income-expense-wrapper flex items-center justify-center mt-6 mb-6 border-2 w-full border-[#EBEBEB] rounded-md p-3">
                  <div className="mr-5 ">
                    <p className="-mb-7 text-center text-sm text-[#a1a1a1] font-medium">
                      INCOME
                    </p>
                    <br />
                    <h1 className="text-[#198049] text-2xl font-semibold ">
                      --
                    </h1>
                  </div>
                  <div className="mt-1 w-0.5 h-10 bg-[#e0e0e0]"></div>
                  <div className="ml-5">
                    <p className="-mb-7 text-center text-sm text-[#a1a1a1] font-medium">
                      EXPENSE
                    </p>
                    <br />
                    <h1 className="text-[#D92B2B] text-2xl font-semibold">
                      --
                    </h1>
                  </div>
                </div>
              </div>

              {/* login/signup */}
              <div className="login-signup flex flex-col items-center justify-center">
                <div className="flex justify-between ">
                  <Link to="/login">
                    <p className="underline text-slate-400">Login</p>
                  </Link>
                  or
                  <Link to="/signup">
                    <p className="underline text-slate-400">
                      Create an account
                    </p>
                  </Link>{" "}
                  <br />
                </div>
                to manage your transactions
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotLoggedIn;
