import { configureStore } from '@reduxjs/toolkit'
import productSlice from '../features/product/productSlice'
import shoppingBasketSlice from '../features/shoppingBasket/shoppingBasketSlice'

export const store = configureStore({
  reducer: {
    product: productSlice,   
    shoppingBasket:shoppingBasketSlice, 
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch