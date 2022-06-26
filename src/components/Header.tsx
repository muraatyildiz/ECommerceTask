import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useAppSelector,useAppDispatch} from '../store/hooks';
import { showCartDialog } from "../features/shoppingBasket/shoppingBasketSlice";

export default function PrimarySearchAppBar() {

  const dispatch = useAppDispatch()
 
  const products = useAppSelector((state) => state.shoppingBasket.productsInBasket)

    return (
        
          <AppBar position="sticky">
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: {  sm: 'block' } }}
              >
               Shoping Center
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: {  md: 'flex' } }}>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={() => dispatch(showCartDialog(true))}
                >
                  <Badge badgeContent={products.length} color="error">
                    <ShoppingCartIcon /> 
                  </Badge>
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
       
    );
}