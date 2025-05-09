import React, { useState, useRef, useEffect } from "react";

export default function MultiSelectCategory({
  selectedCategories,
  setSelectedCategories,
  options,
  label = "Filter Categories",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const allSelected = selectedCategories.length === options.length;
  const isIndeterminate =
    selectedCategories.length > 0 && !allSelected;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([...options]);
    }
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="border px-4 py-2 rounded bg-white shadow-sm hover:bg-gray-50"
      >
        {label}
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-56 bg-white border rounded shadow-lg z-10 p-2 max-h-60 overflow-auto">
          <label className="flex items-center mb-2 font-medium">
            <input
              type="checkbox"
              checked={allSelected}
              ref={(el) => {
                if (el) el.indeterminate = isIndeterminate;
              }}
              onChange={handleSelectAll}
              className="mr-2"
            />
            All
          </label>
          {options.map((category) => (
            <label key={category} className="flex items-center mb-1">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
