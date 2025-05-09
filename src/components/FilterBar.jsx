import React from "react";
import InStockToggle from "./InStockToggle";
import MultiSelectCategory from "./MultiSelectCategory";

function FilterBar({
  categoryFilter,
  setCategoryFilter,
  stockFilter,
  setStockFilter,
  setCurrentPage,
  categories,
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-wrap gap-4">
        <MultiSelectCategory
          selectedCategories={categoryFilter}
          setSelectedCategories={(cats) => {
            setCategoryFilter(cats);
            setCurrentPage(1);
          }}
          options={categories}
        />
        <InStockToggle
          selected={stockFilter}
          onChange={(value) => {
            setStockFilter(value);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
}

export default FilterBar;
