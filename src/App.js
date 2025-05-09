import React, { useState, useMemo } from "react";
import ProductList from "./components/ProductList";
import Modal from "./components/Modal";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import BatchDeleteButton from "./components/BatchDeleteButton";
import FilterBar from "./components/FilterBar";

const initialProducts = [
  { id: 1, name: "Laptop", category: "electronics", price: 999, stock: 9 },
  { id: 2, name: "Shirt", category: "clothing", price: 29, stock: 8 },
  {
    id: 3,
    name: "Phone",
    category: "electronics",
    price: 499,
    stock: "Out of Stock",
  },
  { id: 4, name: "Laptop", category: "electronics", price: 999, stock: 9 },
  { id: 5, name: "Shirt", category: "clothing", price: 29, stock: 8 },
  {
    id: 6,
    name: "Phone",
    category: "electronics",
    price: 499,
    stock: "Out of Stock",
  },
  { id: 7, name: "Laptop", category: "electronics", price: 999, stock: 9 },
  { id: 8, name: "Shirt", category: "clothing", price: 29, stock: 8 },
  {
    id: 9,
    name: "Phone",
    category: "electronics",
    price: 499,
    stock: "Out of Stock",
  },
  { id: 10, name: "Laptop", category: "electronics", price: 999, stock: 9 },
  { id: 12, name: "Shirt", category: "clothing", price: 29, stock: 8 },
  {
    id: 13,
    name: "Phone",
    category: "electronics",
    price: 499,
    stock: "Out of Stock",
  },
  { id: 14, name: "Laptop", category: "electronics", price: 999, stock: 9 },
  { id: 15, name: "Shirt", category: "clothing", price: 29, stock: 8 },
  {
    id: 16,
    name: "Phone",
    category: "electronics",
    price: 499,
    stock: "Out of Stock",
  },
];

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [stockFilter, setStockFilter] = useState("All");
  const [isDelete, setIsDelete] = useState(false);
  const [product, setProduct] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const ITEMS_PER_PAGE = 10;

  const [selectedIds, setSelectedIds] = useState([]);
  const [isBatchDelete, setIsBatchDelete] = useState(false);
  const [sortConfig, setSortConfig] = useState([]);

  function handleToggleSelect(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        categoryFilter.length === 0 || categoryFilter.includes(p.category);

      const matchesStock =
        stockFilter === "All" ||
        (stockFilter === "In Stock" && p.stock > 0) ||
        (stockFilter === "Out of Stock" && p.stock === "Out of Stock");

      return (
        matchesCategory &&
        matchesStock &&
        p.name.toLowerCase().includes(filter.toLowerCase())
      );
    });
  }, [products, categoryFilter, stockFilter, filter]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortConfig.length > 0) {
      sorted.sort((a, b) => {
        for (let { key, direction } of sortConfig) {
          let aVal = a[key];
          let bVal = b[key];

          if (key === "stock") {
            aVal = isNaN(aVal) ? -1 : Number(aVal);
            bVal = isNaN(bVal) ? -1 : Number(bVal);
          }

          if (typeof aVal === "string") {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
          }

          if (aVal < bVal) return direction === "asc" ? -1 : 1;
          if (aVal > bVal) return direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  }, [filteredProducts, sortConfig]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage]);

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) return;
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({ name: "", category: "", price: "", stock: "" });
    setIsAdd(!isAdd);
  };

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  function handleAddClick(product) {
    setProduct(product);
    setIsAdd(!isAdd);
  }

  function handleDelete(idOrIds) {
    if (Array.isArray(idOrIds)) {
      setProducts((prev) => prev.filter((p) => !idOrIds.includes(p.id)));
      setSelectedIds([]);
    } else {
      setProducts((prev) => prev.filter((p) => p.id !== idOrIds));
    }
    setIsDelete(false);
    setProduct("");
  }

  function handleDeleteClick(product = null, isBatch = false) {
    setIsDelete(!isDelete);
    setIsBatchDelete(isBatch);
    setProduct(product || {});
  }

  function handleBatchDeleteClick() {
    handleDeleteClick(null, true); 
  }

  function handleEditClick(product) {
    setIsEdit(!isEdit);
    console.log(product);
    setProduct(product);
  }

  function handleEdit() {
    if (!product.name || !product.category || !product.price || product.price<0) return;
    setProducts(products.map((p) => (p.id === product.id ? product : p)));
    setProduct("");
    setIsEdit(!isEdit);
  }

  function handleSelectAllToggle() {
    const pageIds = paginatedProducts.map((p) => p.id);
    const allSelected = pageIds.every((id) => selectedIds.includes(id));

    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...pageIds])]);
    }
  }

  function handleSort(key) {
    setSortConfig((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        const newDirection = existing.direction === "asc" ? "desc" : "asc";
        return prev.map((item) =>
          item.key === key ? { ...item, direction: newDirection } : item
        );
      } else {
        return [...prev, { key, direction: "asc" }];
      }
    });
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div
        className={
          isAdd
            ? "backdrop-blur-[1px] bg-black/30 cmp-t-modal__overlay fixed flex inset-0 overflow-auto p-4 z-20 items-center "
            : "hidden"
        }
      >
        <Modal
          handleAddClick={handleAddClick}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          handleAdd={handleAdd}
          text={"Add Item"}
        />
      </div>

      <div
        className={
          isEdit
            ? "backdrop-blur-[1px] bg-black/30 cmp-t-modal__overlay fixed flex inset-0 overflow-auto p-4 z-20 items-center "
            : "hidden"
        }
      >
        <Modal
          handleAddClick={handleEditClick}
          newProduct={product}
          setNewProduct={setProduct}
          handleAdd={handleEdit}
          text={"Update Item"}
        />
      </div>
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Product Dashboard</h1>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <FilterBar
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          stockFilter={stockFilter}
          setStockFilter={setStockFilter}
          setCurrentPage={setCurrentPage}
          categories={categories}
        />

        <div className="flex gap-3">
          <button
            onClick={handleAddClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Product
          </button>

          <BatchDeleteButton
            selectedIds={selectedIds}
            onDeleteBatch={handleBatchDeleteClick}
          />
        </div>
      </div>

      <ProductList
        paginatedProducts={paginatedProducts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        totalPages={totalPages}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onSelectAllToggle={handleSelectAllToggle}
        sortConfig={sortConfig}
        onSort={handleSort}
      />

      <DeleteConfirmationModal
        isDelete={isDelete}
        handleDeleteClick={() => setIsDelete(false)}
        handleDelete={handleDelete}
        product={product}
        isBatchDelete={isBatchDelete}
        selectedIds={selectedIds}
      />
    </div>
  );
}
