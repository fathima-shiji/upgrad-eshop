

import Select from 'react-select';

const SelectBox = ({defaultValue, 
    isDisabled, 
    isLoading, 
    isClearable, 
    isSearchable, 
    name, options, 
    onChange, 
    value, 
    getOptionLabel, 
    getOptionValue}) => {
    return(
        <Select
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
    )
}
export default SelectBox;