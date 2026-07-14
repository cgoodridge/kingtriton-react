import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles} from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import '../css/product.css';
import { useStateValue } from '../StateProvider';
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

    console.log("Selected Options ", selectedOptions);

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
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleClick = (newState) => () => {
        setQtyValue(1);
        checkCart();
        addItemToCart();
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const [qtyValue, setQtyValue] = useState(1);
    const [cartDuplicate, setCartDuplicate] = useState(false);

    const handleQtyAdd = () => {
        setQtyValue(qtyValue + 1);
    };
    const handleQtySub = () => {
        if (qtyValue > 1 )
        {
            setQtyValue(qtyValue - 1);
        }
    };

    const handleInput = (event) => {
        setQtyValue(event.target.value);
    };

    const checkCart = () => {
        const index = cart.findIndex(
            (cartItem) => cartItem.id === food.id
        );

        if (index >= 0) {
            console.log('item in cart already, updating quantity');
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

        const selectedCustomizations = Object.keys(selectedOptions).filter(
            (option) => selectedOptions[option]
        );

        const product = {
            id: food?.id,
            name: food?.name,
            price: food?.price,
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
                {/* {cartDuplicate ?
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
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
                } */}
                <Dialog open={open} onClose={handleClose} disableScrollLock>
                    <DialogTitle>{food?.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {food?.description}
                        </DialogContentText>
                        <FormGroup>
                            {console.log("Custom options ", food?.customization_options)}
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
                            <div className="counter">
                                <IconButton
                                    disabled={qtyValue <= 1}
                                    color="secondary"
                                    className="square-button"
                                    size="small"
                                    style={{backgroundColor: "#2196f3"}}
                                    onClick={handleQtySub}
                                >
                                    <RemoveIcon fontSize="inherit" />
                                </IconButton>
                                <input
                                    type="number"
                                    inputprops={{style: { color: "#5f5f5f" }  }}
                                    min="0"
                                    value={qtyValue}
                                    onChange={e => setQtyValue(parseInt(e.target.value))}
                                    className="qtyField"
                                ></input>

                                <IconButton color="secondary" className="square-button" size="small" style={{backgroundColor: "#2196f3"}} onClick={handleQtyAdd}>
                                    <AddIcon fontSize="inherit"/>
                                </IconButton>
                            </div>
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            onClick={handleClick ({ vertical: 'top', horizontal: 'right', })}
                            disableElevation
                        >
                            Add to Cart
                        </Button>
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
                                    <Typography gutterBottom variant="h6" component="h2" align="left">
                                        {food?.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography gutterBottom variant="h6" component="h2" align="left">
                                        ${food?.price}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }} align="left">
                                {food?.description}
                            </Typography>
                        </CardContent>
                        {/* <ListItemText
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >

                                    </Typography>
                                    {food?.description}
                                </React.Fragment>
                            }
                        /> */}

                        {/* <CardActions className="controls">
                            <Box className="control-counters">
                                <div className="counter">
                                    <IconButton color="secondary" size="small" style={{backgroundColor: "#2196f3"}} onClick={handleQtySub}>
                                        <RemoveIcon fontSize="inherit" />
                                    </IconButton>

                                    <input type="number" min="0" value={qtyValue} onChange={e => setQtyValue(parseInt(e.target.value))} className="qtyField"></input>

                                    <IconButton color="secondary" size="small" style={{backgroundColor: "#2196f3"}} onClick={handleQtyAdd}>
                                        <AddIcon fontSize="inherit"/>
                                    </IconButton>
                                </div>
                            </Box>
                            <Fab color="secondary" aria-label="add" onClick={handleClick ({ vertical: 'top', horizontal: 'right', })}>
                                <img src="img/mdi_basket-plus.png"></img>
                            </Fab>
                        </CardActions> */}
                    </Card>
                </Grid>
            </div>
    );
}


export default Product;