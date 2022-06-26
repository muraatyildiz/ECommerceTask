import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { showCartDialog, removeProduct } from "../features/shoppingBasket/shoppingBasketSlice";


export default function ScrollDialog() {
    const products = useAppSelector((state) => state.shoppingBasket.productsInBasket)
    const open = useAppSelector((state) => state.shoppingBasket.showBasket)
    const dispatch = useAppDispatch()

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
        <div>
        <Dialog
            open={open}
            onClose={handleClose}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">Sepetim ({products.length} Ürün)  </DialogTitle>
            <DialogContent dividers={true} sx={{ p: 0 }}>
                <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    <List sx={{ width: 500, minHeight:250, bgcolor: 'background.paper' }}>
                        {products.map((product) => {
                            return <ListItem key={product.product.id} alignItems="flex-start" secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() =>
                                    dispatch(removeProduct(product.product))}>
                                    <DeleteIcon />
                                </IconButton>
                            }>
                               <Box
                                    component="img"
                                    sx={{minWidth:75, m:"auto", pr:2,  height: 60, }}
                                    alt="The house from the offer."
                                    src={product.product.image}
                                />
                                <ListItemText
                                    primary={`${product.count} Adet - Tutar: ${product.cost} $`}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {product.product.title}
                                            </Typography>
                                            - {product.product.description.slice(0, 40)}....
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
        </div>
    );
}
