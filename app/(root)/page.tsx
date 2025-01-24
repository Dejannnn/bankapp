import React from "react";

//Components
import HeaderBox from "../../components/HeaderBox";
import TotalBalanceBox from "../../components/TotalBalanceBox";
import RightSidebar from "../../components/RightSidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccounts } from "@/lib/actions/bank.actions";
const Home = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id });
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently"
          />
          <TotalBalanceBox
            accounts={accounts?.data}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        asdsadasdsad
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={accounts?.transactions}
        banks={accounts?.data.slice(0, 2)}
      />
    </section>
  );
};

export default Home;
