 
import Grid from '@mui/material/Grid2';

import ProductCard from "../productCard/ProductCard";
const ProductList = ({ products }) => {
    console.log("product list card", products);

    return(
        <Grid container direction="row" justifyContent="center" rowSpacing={4} columnSpacing={4}>
          {products.map((product) => (
            <Grid item size={{ xs: 12, sm: 4 }} key={product.id} sx={{ display: "flex"}}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
           

      
       
    );
  
};

export default ProductList;
