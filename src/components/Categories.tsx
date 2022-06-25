import * as React from 'react';
import { useEffect } from "react";
import { FunctionComponent } from 'react';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useAppSelector, useAppDispatch } from '../store/hooks'
import {fetchProductsByCategory, fetchCategories,addSelectedCategory,removeSelectedCategory ,removeProductsUnSelectedCategory } from "../features/product/productSlice";



const Categories = () => {
  const categories = useAppSelector((state) => state.product.categories)
  const selectedCategories = useAppSelector((state) => state.product.selectedCategories)
  const dispatch = useAppDispatch()

  const getCategories =  () => {
    dispatch(fetchCategories())
  }

  const [checked, setChecked] = React.useState([1]);

  const handleChange = (value: string) => () => {
     const check =  selectedCategories.includes(value)
     if(check){
      dispatch(removeSelectedCategory(value))
      dispatch(removeProductsUnSelectedCategory(value))
     }else{
      dispatch(fetchProductsByCategory(value))
      dispatch(addSelectedCategory(value))
      
     }
  
     return

  };
  useEffect(() => {
    getCategories();
   // Check
   

 }, []);
  return (<>
    <Typography sx={{ ml: 1, mt: 2 }} variant="h6" component="div">
      Kategoriler
    </Typography>
    <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {categories.map((value) => {
        const label = value.charAt(0).toUpperCase() + value.slice(1);;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <Checkbox
                edge="end"
                inputProps={{ 'aria-labelledby': label }}
                onChange={handleChange(value)}
              />
            }
            disablePadding
          >
            <ListItemButton>

              <ListItemText id={label} primary={label} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  </>
  );
}

export default Categories
