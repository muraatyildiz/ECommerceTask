import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../features/counter/counterSlice'
import productSlice from '../features/product/productSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import shoppinCartSlice from '../features/shoppingCart/shoppingCartSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    product: productSlice,   
    shoppingCart:shoppinCartSlice, 
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch