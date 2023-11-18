import { useEffect, useState } from "react";
import { fetchFamilyAccounts } from "./repo";
import { AccountModal } from "./component/account_modal";
import { FamilyModal } from "./component/family_modal";
import { getUserInfo } from "../../utils/user";
import { AccountCard } from "./component/account-card";

export default function CashTrackPage() {
  const [accounts, setAccounts] = useState([]);

  const userInfo = getUserInfo();

  const updateFamilyAccounts = () => {
    fetchFamilyAccounts()
      .then((res) => {
        if (res.code === 0) {
          setAccounts(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    updateFamilyAccounts();
  }, []);

  const totalBalance =
    accounts?.reduce((total, account) => total + account.balance, 0) ?? 0;

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="w-full h-24 rounded-lg bg-blue-300 bg-opacity-80 flex items-center justify-between p-4">
        <div className="text-2xl">Total CNY {totalBalance}</div>
        <div className="flex flex-col space-y-2">
          {userInfo.family_id === 0 && <FamilyModal />}
          <AccountModal
            onAccountCreated={(account) => {
              updateFamilyAccounts();
            }}
          />
        </div>
      </div>
      <div className="w-full rounded-lg bg-white bg-opacity-80 mt-4 p-2 flex space-x-2">
        {accounts.map((item) => (
          <AccountCard
            account={item}
            onAccountUpdated={() => updateFamilyAccounts()}
          />
        ))}
      </div>
      <div className="w-full h-full rounded-lg bg-white bg-opacity-80 mt-4">
        records
      </div>
    </div>
  );
}
