import Grid from "@mui/material/Grid2";
import Alert from "../../common/alert/Alert";

import ProductCard from "../productCard/ProductCard";
import { useState } from "react";
const ProductList = ({ products, deleteProduct }) => {
  const [selectedProduct, setSelectProduct] = useState();

  const onClickDelete = (product) => {
    setSelectProduct(product);
  };

  const onConfirmDelete = () => {
    deleteProduct(selectedProduct);
    setSelectProduct(null);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        rowSpacing={4}
        columnSpacing={4}
      >
        {products.map((product) => (
          <Grid
            item
            size={{ xs: 12, sm: 4 }}
            key={product.id}
            sx={{ display: "flex" }}
          >
            <ProductCard product={product} onClickDelete={onClickDelete} />
          </Grid>
        ))}
      </Grid>
      {selectedProduct && (
        <Alert
          isOpen
          onClose={() => setSelectProduct(null)}
          title="Confirm Delete"
          content="Are you sure you want to delete this product"
          onConfirm={onConfirmDelete}
        />
      )}
    </>
  );
};

export default ProductList;
