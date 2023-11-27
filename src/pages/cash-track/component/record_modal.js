import { Modal, InputNumber, Select, DatePicker, Input } from "antd";
import { useState } from "react";
import { showMessage } from "../../../utils/common";
import { createRecord } from "../repo";

export function RecordModal({ record, onHide, categories, accounts }) {
  const [amount, setAmount] = useState(0);
  const [categoryId, setCategory] = useState(categories?.[0]?.id);
  const [accountId, setAccountId] = useState(accounts?.[0]?.id);
  const [happenDate, setHappenDate] = useState();
  const [details, setDetails] = useState("");

  const onCreateNewRecord = () => {
    console.log(amount);
    console.log(categoryId);
    console.log(happenDate);
    console.log(details);
    if (amount === 0 || !categoryId || !happenDate) {
      showMessage?.error("Please fill all fields");
      return;
    }
    createRecord({
      account_id: accountId,
      category_id: categoryId,
      amount: amount,
      detail: details,
      happen_at: Math.floor(happenDate.valueOf() / 1000),
    })
      .then((res) => {
        console.log(res);
        onHide();
      })
      .catch((err) => {
        console.log(err);
        showMessage?.error(err);
      });
  };

  return (
    <Modal
      open={true}
      centered
      onCancel={onHide}
      title="Add new record"
      onOk={onCreateNewRecord}
    >
      <div className="space-y-2">
        <div>
          <div className="font-bold mb-1">Amount</div>
          <InputNumber
            className="w-full"
            value={amount}
            onChange={(v) => setAmount(v)}
          />
        </div>
        <div>
          <div className="font-bold mb-1">Category</div>
          <Select
            className="w-full"
            value={categoryId}
            onChange={(value) => setCategory(value)}
            options={categories?.map((item) => {
              return { value: item.id, label: item.name };
            })}
            placeholder="The category of the record."
          />
        </div>
        <div>
          <div className="font-bold mb-1">Account</div>
          <Select
            className="w-full"
            value={accountId}
            onChange={(value) => setAccountId(value)}
            options={accounts?.map((item) => {
              return { value: item.id, label: item.name };
            })}
            placeholder="The category of the record."
          />
        </div>
        <div>
          <div className="font-bold mb-1">Date</div>
          <DatePicker
            className="w-full"
            value={happenDate}
            showTime={{ format: "HH:mm" }}
            onChange={(value) => {
              console.log("date: ", value);
              setHappenDate(value);
            }}
          />
        </div>
        <div>
          <div className="font-bold mb-1">Details</div>
          <Input.TextArea
            rows={2}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="More description about the record."
          />
        </div>
      </div>
    </Modal>
  );
}
