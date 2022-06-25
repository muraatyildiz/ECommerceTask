import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import type { RootState } from '../../store/store';
import { Product } from "../../types";

// Define a type for the slice state
interface ProductState {
  value: number,
  products: Product[],
  product: Product,
  categories: string[],
  selectedCategories: string[],
  error: string,
  loading: boolean
}

// Define the initial state using that type
const initialState: ProductState = {
  value: 0,
  products: [],
  product: { id: 0, image: "", title: "", price: 0, description: "" },
  categories: [],
  selectedCategories: [],
  error: "",
  loading: false,
}

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  console.log("test2")
  const response = await axios.get<Product[]>("https://fakestoreapi.com/products")
  return response.data
})

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  const response = await axios.get<string[]>("https://fakestoreapi.com/products/categories")
  return response.data
})
export const fetchProductsByCategory = createAsyncThunk("fetchProductsByCategory", async (category: string) => {
  const response = await axios.get<Product[]>("https://fakestoreapi.com/products/category/" + category)
  return response.data
})

export const productSlice = createSlice({
  name: ' product',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategories.push(action.payload)
    },
    removeSelectedCategory: (state, action: PayloadAction<string>) => {
      const indexOfCategory = state.selectedCategories.indexOf(action.payload)
      state.selectedCategories.splice(indexOfCategory, 1)
    },
    removeProductsUnSelectedCategory: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(item => item.category !== action.payload)
      if (state.selectedCategories.length == 0) {
        alert("checkkk")
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchProductsByCategory.fulfilled, (state, action: PayloadAction<Product[]>) => {
      if (state.selectedCategories.length == 1) {
        state.products = action.payload;
      } else {
        state.products.push.apply(state.products, action.payload);
        state.products = state.products.sort((a, b) => Number(a.id) - Number(b.id));
      }
      state.loading = false;
    });

  },
})

export const { addSelectedCategory, removeSelectedCategory, removeProductsUnSelectedCategory } = productSlice.actions

export const selectCount = (state: RootState) => state.product.products

export default productSlice.reducer