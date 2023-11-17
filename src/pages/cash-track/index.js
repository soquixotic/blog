import { useEffect, useState } from "react";
import { fetchFamilyAccounts } from "./repo";
import { Button } from "antd";

export default function CashTrackPage() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetchFamilyAccounts()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="w-full h-24 rounded-lg bg-blue-300 bg-opacity-80 flex items-center justify-between p-4">
        <div className="text-2xl">CNY 1000</div>
        <Button>Add Account</Button>
      </div>
      <div className="w-full h-full rounded-lg bg-white bg-opacity-80 mt-4">
        records
      </div>
    </div>
  );
}
