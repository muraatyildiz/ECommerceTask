import * as React from 'react';
import { FunctionComponent } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Product } from "../types";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppDispatch } from '../store/hooks'
import { addProduct } from "../features/shoppingBasket/shoppingBasketSlice";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface IProductProps {
  product: Product;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ProductCard: FunctionComponent<IProductProps> = (props) => {
  const dispatch = useAppDispatch();
  const { product } = props;
  const [openAlert, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>

      <Card sx={{ maxWidth: 345, }}>
        <CardActionArea sx={{ p: '2px 4px', }}>
          <CardMedia sx={{ width: 'auto', height: 170, margin: "auto" }}
            component="img"
            image={product.image}
            alt={product.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div" sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              minHeight: 64,

            }}>
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical',
              minHeight: 60
            }}>
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={() => dispatch(addProduct(product)) && handleClick()}
            size="small" color="primary" variant="contained" startIcon={<ShoppingCartIcon />} sx={{ width: "100%" }}>
            Sepete Ekle
          </Button>
        </CardActions>
      </Card>

      <Snackbar open={openAlert} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Ürün sepete eklendi
        </Alert>
      </Snackbar>

    </>
  );
}

export default ProductCard;