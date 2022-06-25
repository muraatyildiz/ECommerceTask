import * as React from 'react';
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Sort() {
    const [age, setAge] = React.useState<string>("10");
  
    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value as string);
    };

    return (
        <FormControl sx={{ m: 1, width: 200 }} size="small" >
        <Select sx={{ mr: 3 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>Önerilen Sırlama</MenuItem>
          <MenuItem value={20}>Fiyat En Düşük</MenuItem>
          <MenuItem value={30}>Fiyat En Yüksek</MenuItem>
        </Select>
      </FormControl>
    )
}


