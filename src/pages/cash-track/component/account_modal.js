import { Modal } from "antd";
import { Select } from "antd";
import { InputNumber } from "antd";
import { Input } from "antd";
import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { CurrencyMap, createAccount, updateAccount } from "../repo";

export function AccountModal({ onAccountCreated, account }) {
  const [open, setOpen] = useState(false);
  const accountId = account?.id ?? 0;
  const [accountName, setAccountName] = useState(account?.name ?? "");
  const [balance, setBalance] = useState(account?.balance ?? 0);
  const [currency, setCurrency] = useState(account?.currency ?? 1);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (open) {
      setAccountName(account?.name ?? "");
      setBalance(account?.balance ?? 0);
      setCurrency(account?.currency ?? 1);
      setIsLoading(false);
    }
  }, [account?.balance, account?.currency, account?.name, open]);

  const changeAccount = async () => {
    if (accountId === 0) {
      return await createAccount({
        name: accountName,
        balance: balance,
        currency: currency,
      });
    } else {
      return await updateAccount({
        id: accountId,
        name: accountName,
        balance: balance,
      });
    }
  };

  const onCreateAccount = () => {
    console.log(accountName, balance, currency);
    setIsLoading(true);

    changeAccount()
      .then((resp) => {
        if (resp.code === 0) {
          setOpen(false);
          onAccountCreated?.(resp.data.account);
          messageApi.success("done!");
          return;
        }
        messageApi.error("Failed to change account.");
      })
      .catch((err) => {
        setIsLoading(false);
        messageApi.error("Failed to change account.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      {contextHolder}
      <Button
        type="link"
        onClick={() => {
          setOpen(true);
        }}
      >
        {accountId === 0 ? "Add Account" : "Edit"}
      </Button>
      <Modal
        title={accountId === 0 ? "Create Account" : "Update Account"}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={onCreateAccount}
        confirmLoading={isLoading}
      >
        <div className="flex flex-col mt-5 space-y-2">
          <div className="flex justify-between items-center">
            <label className="w-48">Account name: </label>
            <Input
              value={accountName}
              placeholder="eg: Cash, Bank, Alipay, Wechat Pay, etc."
              onChange={(e) => {
                setAccountName(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="w-48">Balance: </label>
            <InputNumber
              className="w-full"
              value={balance}
              onChange={(value) => setBalance(value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="w-48">Currency: </label>
            <Select
              disabled={accountId !== 0}
              className="w-full"
              value={currency}
              onChange={(value) => setCurrency(value)}
              options={[{ value: 1, label: CurrencyMap[1] }]}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
