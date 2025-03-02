import CreatableSelect from "react-select/creatable";

const SortBy = ({ sortOption, setSortOption }) => {
  const sortOptions = [
    { value: "", label: "Default" },
    { value: "Price: High to Low", label: "Price: High to Low" },
    { value: "Price: Low to High", label: "Price: Low to High" },
    { value: "Newest", label: "Newest" },
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
        container: (base) => ({...base, width: 250, }),
      }}
    />
  );
};

export default SortBy;
