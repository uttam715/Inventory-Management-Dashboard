import React from "react";

export default function Modal({
  handleAddClick,
  newProduct,
  setNewProduct,
  handleAdd,
  text
}) {

  const stock =newProduct.stock;

  return (
    <>
      <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-lg h-fit">
        <div className="flex items-center font-bold text-t justify-center">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        </div>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
          />

          <div className="mb-4">
            <select
              id="category"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="w-full p-2 border rounded"
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="furniture">Furniture</option>
              <option value="books">Books</option>
              <option value="toys">Toys</option>
              <option value="groceries">Groceries</option>
            </select>
          </div>

          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock === "Out of Stock" ? 0 :stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
          />

          <div>
            <button
              onClick={handleAdd}
              className="bg-sky-300 font-bold px-5 rounded-sm py-3 text-t mb-2 w-full"
            >
              {text}
            </button>
            <button
              onClick={handleAddClick}
              className="bg-sky-300 font-bold px-5 rounded-sm py-3 text-t w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
