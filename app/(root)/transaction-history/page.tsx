export const dynamic = "force-dynamic";

import HeaderBox from "@/components/HeaderBox";
import { formatAmount } from "@/lib/utils";
import React from "react";

const TransactionHistory = async () => {
  // const loggedIn = await getLoggedInUser();
  // const accounts = await getAccounts({
  //   userId: loggedIn.$id,
  // });

  // const account = await getAccount({ appwriteItemId });
  // const account: [] = [];
  return (
    <section className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">{"TEST"}</h2>
            <p className="text-14 text-blue-25">{"TEST"}</p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● {"TEST"}
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(2000)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionHistory;
