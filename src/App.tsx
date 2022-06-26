import { useEffect } from "react";
import ProductList from "./components/ProductList";
import Categories from "./components/Categories";
import Box from "@mui/material/Box";
import Header from "./components/Header";
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Search from "./components/Search";
import Sort from "./components/Sort"
import { useAppDispatch } from './store/hooks'
import { fetchProducts } from "./features/product/productSlice";

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
     dispatch(fetchProducts());
  }, []);

  return  (
    <>
      <Header />
      <Box sx={{ mt: 2, width: '100%', }} >
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Categories/>
          </Grid>
          <Grid item xs={10} >
            <Toolbar>
              <Search />
              <Box sx={{ flexGrow: 1 }} />
              <Box >
                <Sort />
              </Box>
            </Toolbar>
            <ProductList/>
          </Grid>
        </Grid>
      </Box> 
    </>
  );
}

export default App;
