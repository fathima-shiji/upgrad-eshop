import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box } from "@mui/material";

const CategoryTabs = ({ categories, selectedCategory, setSelectedCategory }) => { 
  const handleChange = (event, newSelectedCategory) => {
    setSelectedCategory(newSelectedCategory);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2}}>
    <ToggleButtonGroup color="primary" exclusive value={selectedCategory} onChange={handleChange}>
      {categories.map((category, index) => (
        <ToggleButton value={category} key={index}>
          {category}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
    </Box>
  );
};

export default CategoryTabs;
