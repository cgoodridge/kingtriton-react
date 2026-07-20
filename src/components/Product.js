import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles} from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import QuantityControl from "./QuantityControl";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import '../css/product.css';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch } from 'react-redux';
import { addToCart} from '../slices/cartSlice';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/cartSlice';
import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';

const Product = ({food}) => {

    const dispatch = useDispatch();

    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const [selectedOptions, setSelectedOptions] = useState({});

    const handleCheckboxChange = (optionName, isChecked) => {
        setSelectedOptions((prevState) => ({
          ...prevState,
          [optionName]: isChecked, // Update the state for the specific checkbox
        }));
    };

    const handleClickOpen = () => {
        setState({open: true});
    };

    const { vertical, horizontal, open } = state;
    const cart = useSelector(selectItems);
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = (newState) => () => {
        setQtyValue(1);
        checkCart();
        addItemToCart();
        handleClose();
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const [qtyValue, setQtyValue] = useState(1);
    const [cartDuplicate] = useState(false);

    const handleQtyAdd = () => {
        setQtyValue((qtyValue) => qtyValue + 1);
    };
    const handleQtySub = () => {
        setQtyValue((qtyValue) => (qtyValue > 1 ? qtyValue - 1 : 1));
    };

    const checkCart = () => {
        const index = cart.findIndex(
            (cartItem) => cartItem.id === food.id
        );

        if (index >= 0) {
            enqueueSnackbar(food.name + ' quantity updated', {autoHideDuration: 1000, TransitionComponent: Slide,});

        } else {
            enqueueSnackbar(food.name + ' added to cart', {autoHideDuration: 1500, TransitionComponent: Slide,});
        }

    };

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        card: {
          padding: theme.spacing(1),
        },
    }));

    const classes = useStyles();

    const addItemToCart = () => {

        const selectedCustomizations = food?.customization_options
        ?.filter((option) => selectedOptions[option.name]) // Only include selected options
        .map((option) => ({
            name: option.name,
            price: option.price,
        }));
        const customizationsTotalPrice = selectedCustomizations?.reduce((total, option) => total + option.price, 0);

        const product = {
            id: food?.id,
            name: food?.name,
            price: food?.price + customizationsTotalPrice,
            image: food?.image,
            course: food?.course,
            special: food?.special,
            qty: qtyValue,
            customization_options: selectedCustomizations
        }
        dispatch(addToCart(product));
    }

    return (
            <div className={classes.root} key={food.id}>
                {cartDuplicate ?
                    <Snackbar
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message= {food.name + ' quantity updated'}
                        key={vertical + horizontal}
                    />
                    :
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message= {food.name + ' added to Cart'}
                        key={vertical + horizontal}
                    />
                }
                <Dialog open={open} onClose={handleClose} disableScrollLock>
                    <img
                        className="dialog-image"
                        srcSet={`${food.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${food.image}?w=248&fit=crop&auto=format`}
                        alt={food.name}
                        loading="lazy"
                    />
                    <DialogTitle>{food?.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {food?.description}
                        </DialogContentText>
                        <FormGroup>
                            {food?.customization_options?.length ? (
                                food.customization_options.map((custom_option, key) => (
                                    <FormControlLabel
                                        key={key}
                                        control={
                                            <Checkbox
                                                checked={!!selectedOptions[custom_option?.name]}
                                                onChange={(e) =>
                                                    handleCheckboxChange(custom_option?.name, e.target.checked)
                                                }
                                            />
                                        }
                                        label={custom_option?.name + ' +$' + custom_option?.price}
                                    />
                                ))
                            ) : (
                                'No customization options available for this item.'
                            )}
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <Box className="control-counters">
                            <QuantityControl
                                qtyValue={qtyValue}
                                handleQtyAdd={handleQtyAdd}
                                handleQtySub={handleQtySub}
                                setQtyValue={(e) => setQtyValue(parseInt(e.target.value))}
                            />
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            onClick={handleClick ({ vertical: 'top', horizontal: 'right', })}
                            disableElevation
                        >
                            Add to Cart
                        </Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <Grid item xs={12} sm={3} className={classes.card}>
                    <Card className="card small" style={{borderRadius: "5px"}} onClick={handleClickOpen}>
                        <CardMedia
                            component="img"
                            alt={food.name}
                            height="225"
                            image={food.image}
                            title={food.name}
                            className="card-image"
                        />
                        <CardContent>
                            <Grid container style={{marginBottom: '10px'}}>
                                <Grid item xs={10}>
                                    <Typography gutterBottom variant="h6" component="h6" align="left">
                                        {food?.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography gutterBottom variant="h6" component="h6" align="left">
                                        ${food?.price}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }} align="left">
                                {food?.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
    );
}


export default Product;