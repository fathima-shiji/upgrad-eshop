import CreatableSelect from "react-select/creatable";

const SortBy = ({ sortOption, setSortOption }) => {
  const sortOptions = [
    { value: "", label: "Default" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "newest", label: "Newest" },
  ];

  const handleChange = (selectedOption) => {
    setSortOption(selectedOption ? selectedOption.value : "");
  };

  return (
    <CreatableSelect
      options={sortOptions}
      value={sortOptions.find((option) => option.value === sortOption)}
      onChange={handleChange}
      placeholder="Select..."
      styles={{
        container: (base) => ({
          ...base,
          width: 250,
          marginBottom: "30px",
          marginTop: "30px",
        }),
      }}
    />
  );
};

export default SortBy;
