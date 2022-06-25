import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store';
import { Product , } from "../../types";

// Define a type for the slice state
interface CounterState {
  value: number,
  products:Product[],
}


// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
  products:[]

}

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    addProduct:(state, action:PayloadAction<Product>)=> {
      
          state.products.push(action.payload)
          
    },
    
  },

})

export const { increment, decrement, incrementByAmount, addProduct } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer