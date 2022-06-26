import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store';
import { Product, CartProduct} from "../../types";

interface CounterState {
    productsInCart: CartProduct[],
    cartProduct : CartProduct,
    showCart : boolean,
}

const initialState: CounterState = {
    productsInCart: [],
    cartProduct:{ product: { id: 0, image: "", title: "", price: 0, description: "" }, count:1, cost:0},
    showCart : false,
}

export const shoppingCartSlice= createSlice({
    name: 'shoppingCart',

    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
          const index = state.productsInCart.findIndex((item) => item.product.id === action.payload.id);
          if(index != -1){
            state.productsInCart[index].count +=1;
            state.productsInCart[index].cost += state.productsInCart[index].product.price;
            return;
          }
         state.cartProduct.product = action.payload;
         state.cartProduct.cost = action.payload.price;  
         state.productsInCart.push( state.cartProduct);       
        },
        removeProduct: (state, action: PayloadAction<Product>) => {
            state.productsInCart = state.productsInCart.filter(item => item.product.id !== action.payload.id)
            if(state.productsInCart.length == 0){
                state.showCart=false;
            }
        },
        showCartDialog: (state, action: PayloadAction<boolean>) => {
            state.showCart = action.payload
        },
    

    },

})

export const { addProduct, removeProduct ,showCartDialog } = shoppingCartSlice.actions
export const selectCart = (state: RootState) => state.shoppingCart.productsInCart
export default shoppingCartSlice.reducer