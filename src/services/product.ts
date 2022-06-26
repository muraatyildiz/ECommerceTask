import { createAsyncThunk } from '@reduxjs/toolkit'
import { Product} from "../types";
import axios from 'axios';

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
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