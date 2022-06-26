import { useEffect } from "react";
import ProductList from "./containers/ProductList";
import Categories from "./containers/Categories";
import Box from "@mui/material/Box";
import Header from "./containers/Header";
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Search from "./containers/Search";
import Sort from "./containers/Sort"
import { useAppDispatch } from './store/hooks'
import { fetchProducts } from "./services/product";
import Basket from "./containers/Basket";

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <Basket />
      <Header />
      <Box sx={{ mt: 1, width: '100%', }} >
        <Grid container spacing={1}>
          <Grid item xs={2} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Categories />
          </Grid>
          <Grid item xs={10} >
            <Toolbar >
              <Search />
              <Box sx={{ flexGrow: 1 }} />
              <Box >
                <Sort />
              </Box>
            </Toolbar>
            <ProductList />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
