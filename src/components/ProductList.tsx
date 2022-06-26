import Box from "@mui/material/Box";
import ProductCard from "./ProductCard";
import { useAppDispatch, useAppSelector } from '../store/hooks'
import Card from "@mui/material/Box";

export default function Sort() {
  const products = useAppSelector((state) => state.product.productList)

  return (
    <Card>
      <Box display="flex" flexWrap="wrap" width="100%" sx={{
        mt: 1, ml: 1,
        gap: { xl: 9, md: 8, lg: 1 }
      }}>
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </Box>
    </Card>
  )
}