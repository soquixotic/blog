import { CurrencySymbol } from "../../repo";
import { AccountModal } from "../account_modal";

export function AccountCard({ account, onAccountUpdated }) {
  return (
    <div className="flex flex-col w-28 h-28 bg-blue-200 bg-opacity-80 rounded-lg p-2 justify-center space-y-2">
      <div className="font-bold text-base">{account.name}</div>
      <div className="">
        {CurrencySymbol[account.currency]} {account.balance}
      </div>
      <div className="w-full flex items-center justify-center">
        <AccountModal
          account={account}
          onAccountCreated={() => {
            onAccountUpdated();
          }}
        />
      </div>
    </div>
  );
}
