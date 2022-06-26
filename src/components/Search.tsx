import  React , {useRef} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Product } from "../types";
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { filterProductBySearch, showSelectedProduct} from "../features/product/productSlice";



export default function Search() {
  const valueRef = useRef<any>()
  const searchList = useAppSelector((state) => state.product.allProduct)
  const dispatch = useAppDispatch()

  function handleChangeAutocomplete(event:any, value:string) {
    dispatch(showSelectedProduct(value));
  }
  function handleChangeTextField(event:any) {
    dispatch(filterProductBySearch(valueRef.current.value));
  }


  return (
    <Autocomplete  sx={{ p: '2px 4px', display:{sm:'flex' , xs:'none'} ,  width: 400 }}
    freeSolo
    id="free-solo-2-demo"
    disableClearable
    onChange={handleChangeAutocomplete}
    options={searchList.map((option) => option.title)}
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder="Ürün ara..."
        onChange={handleChangeTextField}
      
        inputRef={valueRef} 
        InputProps={{
          ...params.InputProps,
          type: 'search',
        }}
      />
    )}
  />
  );
}

