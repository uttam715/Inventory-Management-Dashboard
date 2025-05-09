import React from "react";
import ProductTable from "./ProductTable";
import Pagination from "./Pagination";

export default function ProductList({
  paginatedProducts,
  currentPage,
  setCurrentPage,
  editingProduct,
  setEditingProduct,
  totalPages,
  handleDeleteClick,
  handleEditClick,
  selectedIds,
  onToggleSelect,
  onSelectAllToggle,
  sortConfig,
  onSort,
}) {
  return (
    <div>
      {paginatedProducts.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <>
          <ProductTable
            products={paginatedProducts}
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
            selectedIds={selectedIds}
            onToggleSelect={onToggleSelect}
            paginatedProducts={paginatedProducts}
            onSelectAllToggle={onSelectAllToggle}
            sortConfig={sortConfig}
            onSort={onSort}
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}
