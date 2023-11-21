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
      <div className="w-full h-24 rounded-lg bg-blue-300 bg-opacity-80 flex items-center justify-between p-4 mb-4">
        <div className="text-2xl">Total CNY {totalBalance}</div>
        <div className="flex flex-col space-y-2">
          {userInfo.family_id === 0 && <FamilyModal />}
        </div>
      </div>
      <div className="font-bold mb-1 text-lg">Accounts</div>
      <div className="overflow-x-auto h-48 bg-white bg-opacity-80 rounded-lg  mb-4">
        <div className="w-fit p-2 flex space-x-2">
          <div className="flex flex-col w-28 h-28 bg-blue-100 bg-opacity-80 rounded-lg p-2 items-center justify-center space-y-2">
            <AccountModal
              onAccountCreated={(_) => {
                updateFamilyAccounts();
              }}
            />
          </div>
          {accounts.map((item) => (
            <AccountCard
              account={item}
              onAccountUpdated={() => updateFamilyAccounts()}
            />
          ))}
        </div>
      </div>
      <div className="font-bold mb-1 text-lg">Records</div>
      <div className="w-full h-full rounded-lg bg-white bg-opacity-80">
        records
      </div>
    </div>
  );
}
