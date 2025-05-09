export default function DeleteConfirmationModal({
  isDelete,
  handleDeleteClick,
  handleDelete,
  product,
  isBatchDelete,
  selectedIds,
}) {
  const message = isBatchDelete
    ? `Are you sure you want to delete ${selectedIds.length} selected products?`
    : `Are you sure you want to delete "${product?.name}"?`;

  return (
    <div
      className={
        isDelete
          ? "flex z-10 fixed inset-0 p-4 overflow-auto bg-black/30 backdrop-blur-[1px]"
          : "hidden"
      }
    >
      <div className="bg-white rounded-md m-auto px-12 py-8 shadow-lg w-1/2 max-w-md">
        <p className="text-center mb-6">{message}</p>
        <div className="flex items-center justify-center">
          <button
            className="font-bold text-l px-5 py-2 bg-sky-300 rounded-sm border border-sky-300 mr-3"
            onClick={handleDeleteClick}
          >
            No, cancel
          </button>
          <button
            className="font-bold text-l px-5 py-2 bg-red-300 rounded-sm border border-red-300"
            onClick={() =>
              isBatchDelete
                ? handleDelete(selectedIds)
                : handleDelete(product.id)
            }
          >
            Yes, confirm
          </button>
        </div>
      </div>
    </div>
  );
}
