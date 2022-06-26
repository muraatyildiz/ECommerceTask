import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch } from '../store/hooks'
import { sortProductList } from "../features/product/productSlice";

export default function Sort() {
    const dispatch = useAppDispatch()

    const handleChange = (event: SelectChangeEvent) => {
        dispatch(sortProductList(event.target.value))
    };

    return (
        <FormControl sx={{ m: 1, width: 200 }} size="small" >
        <Select sx={{ mr: 3 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
          defaultValue={"initial"}
        >
          <MenuItem value="initial">Önerilen Sırlama</MenuItem>
          <MenuItem value="ascAsPrice">Fiyat En Düşük</MenuItem>
          <MenuItem value="descAsPrice">Fiyat En Yüksek</MenuItem>
        </Select>
      </FormControl>
    )
}


