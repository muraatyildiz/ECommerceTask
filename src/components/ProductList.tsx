import Box from "@mui/material/Box";
import ProductCard from "./ProductCard";
import { useAppDispatch, useAppSelector } from '../store/hooks'


export default function Sort() {
    const dispatch = useAppDispatch()
    const products = useAppSelector((state) => state.product.productList)
 
    return (
        <Box display="flex" flexWrap="wrap" width="100%" gap={2} sx={{ mt: 3, ml: 1 }}>
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </Box>
    )
}