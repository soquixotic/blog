import { Modal, Input } from "antd";
import { createCategory } from "../../repo";
import { useState } from "react";

export function CategoryModal({ category, onHide, onOk }) {
  const [name, setName] = useState("");
  const [loading, setIsLoading] = useState(false);
  const onCreate = () => {
    setIsLoading(true);
    createCategory(name)
      .then((res) => {
        if (res.code === 0) {
          onOk?.();
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      open={true}
      title="Create a category"
      onCancel={() => {
        onHide();
      }}
      onOk={onCreate}
      loading={loading}
      centered
    >
      <div>
        <div className="mb-2 font-bold">Name</div>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="The name of the category"
        />
      </div>
    </Modal>
  );
}
