import { useCallback, useEffect, useState } from "react";
import {
  fetchFamilyAccounts,
  fetchFamilyRecords,
  fetchFamilyCategories,
} from "./repo";
import { AccountModal } from "./component/account_modal";
import { FamilyModal } from "./component/family_modal";
import { useLoginModalSwitch, useUserData } from "../../utils/user";
import { AccountCard } from "./component/account-card";
import { RecordModal } from "./component/record_modal";
import { CategoryCard } from "./component/category-card";

export default function CashTrackPage() {
  const [accounts, setAccounts] = useState([]);
  const [records, setRecords] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [openLogin] = useLoginModalSwitch();

  const userData = useUserData();

  const updateFamilyAccounts = useCallback(() => {
    fetchFamilyAccounts()
      .then((res) => {
        if (res.code === 0) {
          setAccounts(res.data);
        }
        if (res.code === 400004) {
          openLogin();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    fetchFamilyCategories().then((res) => {
      console.log(res);
      if (res.code === 0) {
        setCategories(res.data.categories);
      }
    });
    fetchFamilyRecords().then((res) => {
      if (res.code === 0) {
        setRecords(res.data.records);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateFamilyAccounts();
  }, [userData, updateFamilyAccounts]);

  const totalBalance =
    accounts?.reduce((total, account) => total + account.balance, 0) ?? 0;

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="w-full h-24 rounded-lg bg-blue-300 bg-opacity-80 flex items-center justify-between p-4 mb-2">
        <div className="text-2xl">Total CNY {totalBalance.toFixed(2)}</div>
        <div className="flex flex-col space-y-2">
          {userData?.user?.family_id === 0 && <FamilyModal />}
        </div>
      </div>
      <div className="font-bold mb-1 text-lg">Accounts</div>
      <div className="overflow-x-auto overflow-y-visible h-32 bg-white bg-opacity-80 rounded-lg  mb-4">
        <div className="w-fit p-2 flex space-x-2">
          <div className="flex flex-col w-28 h-28 bg-blue-200 bg-opacity-80 rounded-lg p-2 items-center justify-center space-y-2">
            <AccountModal
              onAccountCreated={(_) => {
                updateFamilyAccounts();
              }}
            />
          </div>
          {accounts.map((item, index) => (
            <AccountCard
              key={index}
              account={item}
              onAccountUpdated={() => updateFamilyAccounts()}
            />
          ))}
        </div>
      </div>

      <div className="font-bold mb-1 text-lg">Categories</div>
      <div className="w-full h-fit rounded-lg bg-white bg-opacity-80 p-4 flex flex-wrap">
        <CategoryCard onUpdate={() => updateFamilyAccounts()} />
        {categories?.map((item, index) => {
          return (
            <CategoryCard
              key={index}
              category={item}
              onUpdate={() => updateFamilyAccounts()}
            />
          );
        })}
      </div>

      <div className="font-bold mb-1 text-lg">Records</div>
      <div className="w-full h-fit rounded-lg bg-white bg-opacity-80 p-4">
        {showRecordModal && (
          <RecordModal
            categories={categories}
            accounts={accounts}
            onHide={() => {
              setShowRecordModal(false);
            }}
          />
        )}
        <div
          className="bg-red-50 rounded-lg p-2 h-20 flex items-center justify-center text-3xl select-none hover:cursor-pointer"
          onClick={() => {
            setShowRecordModal(true);
          }}
        >
          +
        </div>

        {records?.map((item) => {
          return (
            <div className="bg-red-50 rounded-lg p-2 h-20 flex items-center justify-center select-none hover:cursor-pointer">
              {JSON.stringify(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
