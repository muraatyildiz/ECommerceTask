import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function Searc() {
    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex',  width: 400 }}      >

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Ürün ara..."
          inputProps={{ 'aria-label': 'ara' }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="ara">
          <SearchIcon />
        </IconButton>
        
      </Paper>
    );
  }