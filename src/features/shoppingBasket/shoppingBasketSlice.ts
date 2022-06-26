import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store';
import { Product, BasketProduct } from "../../types";

interface CounterState {
    productsInBasket: BasketProduct[],
    basketProduct: BasketProduct,
    showBasket: boolean,
}

const initialState: CounterState = {
    productsInBasket: [],
    basketProduct: { product: { id: 0, image: "", title: "", price: 0, description: "" }, count: 1, cost: 0 },
    showBasket: false,
}

export const shoppingBasketSlice = createSlice({
    name: 'shoppingBasket',

    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            const index = state.productsInBasket.findIndex((item) => item.product.id === action.payload.id);
            if (index !== -1) {
                state.productsInBasket[index].count += 1;
                state.productsInBasket[index].cost += state.productsInBasket[index].product.price;
                return;
            }
            state.basketProduct.product = action.payload;
            state.basketProduct.cost = action.payload.price;
            state.productsInBasket.push(state.basketProduct);
        },
        removeProduct: (state, action: PayloadAction<Product>) => {
            state.productsInBasket = state.productsInBasket.filter(item => item.product.id !== action.payload.id)
            if (state.productsInBasket.length === 0) {
                state.showBasket = false;
            }
        },
        showCartDialog: (state, action: PayloadAction<boolean>) => {
            state.showBasket = action.payload
        },
    },

})

export const { addProduct, removeProduct, showCartDialog } = shoppingBasketSlice.actions
export const selectBasket = (state: RootState) => state.shoppingBasket.productsInBasket
export default shoppingBasketSlice.reducer