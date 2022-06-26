import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProductCard from "./ProductCard";
import {  useAppSelector } from '../store/hooks'
import Card from "@mui/material/Box";

export default function Sort() {
  const products = useAppSelector((state) => state.product.productList)
  const loading = useAppSelector((state) => state.product.loading)
  const search = useAppSelector((state) => state.product.searchText)

  return (
    <Card>
      <Box display="flex" flexWrap="wrap" width="100%" sx={{
        mt: 1, ml: 1,
        gap: { xl: 9, md: 8, lg: 1 }
      }}>
        {loading && products.length === 0 &&  <Typography> Yükleniyor </Typography>}
        {products.length === 0 && search && <Typography> Aradığınız ürün bulunmamaktadır! </Typography>}
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </Box>
    </Card>
  )
}