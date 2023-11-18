import { Button, Modal, Input, message } from "antd";
import { useState } from "react";
import { createFamily } from "../repo";

export function FamilyModal() {
  const [open, setOpen] = useState(false);
  const [familyName, setFamilyName] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);

  const onCreateFamily = () => {
    createFamily({
      name: familyName,
    })
      .then(() => {
        messageApi.success("Family created");
        setOpen(false);
      })
      .catch((err) => {
        messageApi.error("Failed to create family");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      {contextHolder}
      <Button onClick={() => setOpen(true)}>Create Family</Button>
      <Modal
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        onOk={onCreateFamily}
        confirmLoading={isLoading}
      >
        <div className="flex justify-between items-center mt-5">
          <label className="w-48">Family name: </label>
          <Input
            value={familyName}
            onChange={(e) => {
              setFamilyName(e.target.value);
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
