import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const SelectBox = ({
  defaultValue,
  isDisabled,
  isLoading,
  isClearable,
  isSearchable,
  name,
  options,
  onChange,
  value,
  getOptionLabel,
  getOptionValue,
  isCreatable,
}) => {
  const SelectComponent = isCreatable ? CreatableSelect : Select;
  return (
    <SelectComponent
      onChange={onChange}
      defaultValue={defaultValue}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isClearable={isClearable}
      isSearchable={isSearchable}
      name={name}
      options={options}
      value={value}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
    />
  );
};
export default SelectBox;
