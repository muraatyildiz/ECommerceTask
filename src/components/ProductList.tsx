import Box from "@mui/material/Box";
import ProductCard from "./ProductCard";
import { useAppDispatch, useAppSelector } from '../store/hooks'
import Cart from "./Basket";


export default function Sort() {
    const dispatch = useAppDispatch()
    const products = useAppSelector((state) => state.product.productList)
 
    return (
      <>
      <Cart/>
        <Box display="flex" flexWrap="wrap" width="100%" gap={2} sx={{ mt: 1, ml: 1 }}>
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </Box>
      </>
    )
}