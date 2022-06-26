import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {  useAppDispatch, useAppSelector } from '../store/hooks';
import { showCartDialog,removeProduct } from "../features/shoppingCart/shoppingCartSlice";


export default function ScrollDialog() {

    const products = useAppSelector((state) => state.shoppingCart.productsInCart)
    const open = useAppSelector((state) => state.shoppingCart.showCart)

    const dispatch = useAppDispatch()
    // const [open, setOpen] = React.useState(true);


    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        // setOpen(true);
        // setScroll(scrollType);
    };

    const handleClose = () => {
        dispatch(showCartDialog(false));   
    };

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
     
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Sepetim ({products.length} Ürün)  </DialogTitle>
                <DialogContent dividers={true}   sx={{ p:0}}>
                    <DialogContentText 
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
                            {products.map((product) => {
                                return <ListItem key={product.product.id} alignItems="flex-start" secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => dispatch(removeProduct(product.product))}>
                                        <DeleteIcon />
                                    </IconButton>
                                }>
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={product.product.image} sx={{ width: 'auto', height: 50,}}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${product.count} Adet - Tutar: ${product.cost} `}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {product.product.title }
                                                </Typography>
                                               - { product.product.description.slice(0,40)}....
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            })}
                        </List>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>İptal</Button>
                    <Button onClick={handleClose}>Tamam</Button>
                </DialogActions>
            </Dialog>
      
    );
}
