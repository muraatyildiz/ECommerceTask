import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store';
import { Product} from "../../types";
import { fetchProducts , fetchCategories ,fetchProductsByCategory} from "../../services/product"

enum SortType {
  ASC = "ascAsPrice",
  DESC = "descAsPrice",
}

interface ProductState {
  allProduct: Product[],
  productList: Product[],
  product: Product,
  categories: string[],
  selectedCategories: string[],
  selectedProduct: Product,
  searchText: string,
  error: string,
  loading: boolean,
  sort: string,
}

const initialState: ProductState = {
  allProduct: [],
  productList: [],
  product: { id: 0, image: "", title: "", price: 0, description: "" },
  categories: [],
  selectedCategories: [],
  selectedProduct: { id: 0, image: "", title: "", price: 0, description: "" },
  searchText: "",
  error: "",
  loading: false,
  sort: "",
}

export const productSlice = createSlice({
  name: ' product',
  initialState,
  reducers: {
    filterProductBySearch: (state, action: PayloadAction<string>) => {
      if (action.payload ===  '' || action.payload ===  null) {
        state.productList = state.allProduct;
      } else {
        state.productList = state.allProduct;
        state.productList = state.productList.filter((item) => 
        item.title.toLowerCase().includes(action.payload.toLowerCase()));
      }
    },
    showSelectedProduct: (state, action: PayloadAction<string>) => {
      if (action.payload ===  '' || action.payload ===  null) {
        state.productList.push.apply(state.productList, state.allProduct);
      } else {
        state.productList = state.productList.filter(item => item.title ===  action.payload)
      }
    },
    addSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategories.push(action.payload)
    },
    removeSelectedCategory: (state, action: PayloadAction<string>) => {
      const indexOfCategory = state.selectedCategories.indexOf(action.payload)
      state.selectedCategories.splice(indexOfCategory, 1)
    },
    removeProductsUnSelectedCategory: (state, action: PayloadAction<string>) => {
      state.productList = state.productList.filter(item => item.category !== action.payload)
      if (state.selectedCategories.length ===  0) {
        state.productList = state.allProduct;
      }
    },
    sortProductList: (state, action: PayloadAction<string>) => {
      if(action.payload === SortType.ASC){
        state.productList = state.productList.sort((a, b) => Number(a.price) - Number(b.price));
      }else if (action.payload === SortType.DESC) {
        state.productList = state.productList.sort((b, a) => Number(a.price) - Number(b.price));
      } else {
        state.productList = state.productList.sort((a, b) => Number(a.id) - Number(b.id));
      }
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
      state.error = ""
    });
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.productList = action.payload;
      state.allProduct = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = "Ürünleri getirirken bir hata oluştu"
    });

    builder.addCase(fetchCategories.pending, (state, action) => {
      state.loading = true;
      state.error = ""
    });
    builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = "Kategorileri getirirken bir hata oluştu"
    });

    builder.addCase(fetchProductsByCategory.pending, (state, action) => {
      state.loading = true;
      state.error = ""
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action: PayloadAction<Product[]>) => {
      if (state.selectedCategories.length === 1) {
        state.productList = action.payload;
      } else {
        state.productList.push.apply(state.productList, action.payload);
        state.productList = state.productList.sort((a, b) => Number(a.id) - Number(b.id));
      }
      state.loading = false;
    });
    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = "Ürünleri getirirken bir hata oluştu"
    });

  },
})

export const { addSelectedCategory, removeSelectedCategory,
  removeProductsUnSelectedCategory, filterProductBySearch,
  showSelectedProduct, sortProductList } = productSlice.actions

export const selectCount = (state: RootState) => state.product.productList

export default productSlice.reducer