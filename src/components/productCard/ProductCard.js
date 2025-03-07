import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import { Link } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductCard = ({ product, onClickDelete }) => {
  return (
    <Card
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={product.imageUrl}
          alt={product.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{product.name}</Typography>

            <Typography
              variant="h6"
              sx={{ color: "black", fontWeight: "bold" }}
            >
              ₹ {product.price}
            </Typography>
          </div>
          <Typography variant="body2" color="textSecondary">
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions
        sx={{
          padding: "16px",
          justifyContent: "space-between",
          marginTop: "auto",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#3F51B5",
            color: "white",
            "&:hover": { backgroundColor: "#303F9F" },
          }}
          component={Link}
          to={`/product/${product.id}`}
        >
          BUY
        </Button>
        <div>
          <IconButton
            color="grey"
            component={Link}
            to={`/product/${product.id}/edit`}
          >
            <EditIcon />
          </IconButton>

          <IconButton color="grey" onClick={() => onClickDelete(product)}>
            <DeleteIcon />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
