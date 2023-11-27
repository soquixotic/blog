import { useState } from "react";
import { CategoryModal } from "./category_modal";
import { Modal } from "antd";
import { deleteCategory } from "../../repo";

const { confirm } = Modal;

export function CategoryCard({ category, onUpdate }) {
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const onDeleteCategory = () => {
    confirm({
      centered: true,
      content: "Are you sure to delete the category? ",
      onOk() {
        deleteCategory(category.id)
          .then((res) => {
            if (res.code === 0) {
              onUpdate?.();
            }
          })
          .catch((err) => console.log(err));
      },
    });
  };

  return (
    <div>
      <div
        className="bg-blue-100 rounded-lg h-8 w-fit p-4 flex items-center justify-center select-none hover:cursor-pointer m-1"
        onClick={() => {
          category ? onDeleteCategory() : setShowCategoryModal(true);
        }}
      >
        {category && <div className="font-bold">{category?.name}</div>}
        {!category && <div className="font-bold text-base">+</div>}
      </div>
      {showCategoryModal && (
        <CategoryModal
          category={category}
          onHide={() => {
            setShowCategoryModal(false);
          }}
          onOk={() => {
            onUpdate?.();
            setShowCategoryModal(false);
          }}
        />
      )}
    </div>
  );
}
