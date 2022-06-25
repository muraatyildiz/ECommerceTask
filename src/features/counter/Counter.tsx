import React, { useState } from 'react'
import { Product } from "../../types";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { addProduct, decrement, increment } from './counterSlice'

export default function Counter() {
    // The `state` arg is correctly typed as `RootState` already
    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()

    const test = () => {
        // const product: Product = {
        //     id: count,
        // }
        dispatch(increment());
        // dispatch(addProduct(product));
    }

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={test}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
        </div>
    )
}