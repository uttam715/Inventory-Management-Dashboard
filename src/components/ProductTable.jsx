import React from "react";

function ProductTable({
  products,
  editingProduct,
  setEditingProduct,
  handleDeleteClick,
  handleEditClick,
  selectedIds,
  onToggleSelect,
  onSelectAllToggle,
  paginatedProducts,
  sortConfig,
  onSort,
}) {
  const allSelected = paginatedProducts.every((product) =>
    selectedIds.includes(product.id)
  );

  const getSortIcon = (column) => {
    const sortItem = sortConfig?.find((s) => s.key === column);
    if (!sortItem) return "";
    return sortItem.direction === "asc" ? "↑" : "↓";
  };
  return (
    <div>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className=" border p-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAllToggle}
                />
              </th>
              <th
                className="border p-2 cursor-pointer"
                onClick={() => onSort("name")}
              >
                Name {getSortIcon("name")}
              </th>
              <th
                className="border p-2 cursor-pointer"
                onClick={() => onSort("category")}
              >
                Category {getSortIcon("category")}
              </th>
              <th
                className="border p-2 cursor-pointer"
                onClick={() => onSort("price")}
              >
                Price {getSortIcon("price")}
              </th>
              <th
                className="border p-2 cursor-pointer"
                onClick={() => onSort("stock")}
              >
                Stock {getSortIcon("stock")}
              </th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="border p-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(product.id)}
                    onChange={() => onToggleSelect(product.id)}
                  />
                </td>

                <td className="border p-2">
                  {editingProduct?.id === product.id ? (
                    <input
                      value={editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          name: e.target.value,
                        })
                      }
                      className="p-1 border rounded"
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td className="border p-2">
                  {editingProduct?.id === product.id ? (
                    <input
                      value={editingProduct.category}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          category: e.target.value,
                        })
                      }
                      className="p-1 border rounded"
                    />
                  ) : (
                    product.category
                  )}
                </td>
                <td className="border p-2">
                  {editingProduct?.id === product.id ? (
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: e.target.value,
                        })
                      }
                      className="p-1 border rounded"
                    />
                  ) : (
                    `$${product.price}`
                  )}
                </td>
                <td className="border p-2">
                  {editingProduct?.id === product.id ? (
                    <input
                      type="number"
                      value={editingProduct.stock}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          stock: e.target.value,
                        })
                      }
                      className="p-1 border rounded"
                    />
                  ) : product.stock > 0 ? (
                    `${product.stock} In Stock`
                  ) : (
                    "Out of Stock"
                  )}
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteClick(product)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductTable;
