import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useAppSelector,useAppDispatch} from '../store/hooks';
import { showCartDialog } from "../features/shoppingCart/shoppingCartSlice";

export default function PrimarySearchAppBar() {

  const dispatch = useAppDispatch()
 
  const products = useAppSelector((state) => state.shoppingCart.productsInCart)

    return (
        
          <AppBar position="sticky">
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
               Shoping Center
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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