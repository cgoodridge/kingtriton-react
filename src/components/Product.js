import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles} from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import '../css/product.css';
import { useStateValue } from '../StateProvider';
import Snackbar from '@mui/material/Snackbar';



const Product = ({food}) => {

    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    const handleClick = (newState) => () => {
        setState({ open: true, ...newState });
        addToBasket();
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const [qtyValue, setQtyValue] = useState(1);

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


    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        card: {
          padding: theme.spacing(1),
        },
    }));

    const classes = useStyles();

    const [{ cart }, dispatch] = useStateValue();

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_CART',
            item: {
                id: food.id,
                name: food.name,
                price: food.price,
                image: food.image,
                course: food.course,
                special: food.special,
                qty: qtyValue
            },  
        })
    }

    return (
        <div className={classes.root} key={food.id}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message= {food.name + ' added to Cart'} 
                key={vertical + horizontal}
            />

            {/* <Card component={Snackbar} 
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                key={vertical + horizontal}
                sx={{ display: 'flex' }}>
                <CardContent>
                    <p>{food.name + ' added to Cart'} </p>
                </CardContent>
            </Card> */}

            <Grid item xs={12} sm={3} className={classes.card}>
                <Card className="card small" style={{borderRadius: "20px"}} >
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
                                    {food.name} 
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography gutterBottom variant="h6" component="h2" align="left">
                                    ${food.price} 
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>

                    <CardActions className="controls">
                        <Box className="control-counters">
                            <div class="counter">
                                <IconButton color="secondary" size="small" style={{backgroundColor: "#2196f3"}} onClick={handleQtySub}>
                                    <RemoveIcon fontSize="inherit" />
                                </IconButton> 

                                <input type="number" min="0" value={qtyValue} onChange={e => setQtyValue(parseInt(e.target.value))} className="qtyField"></input>
                                {/* <span>{food.quantity}</span> */}

                                <IconButton color="secondary" size="small" style={{backgroundColor: "#2196f3"}} onClick={handleQtyAdd}>
                                    <AddIcon fontSize="inherit"/> 
                                </IconButton> 
                            </div>
                        </Box>
                        <Fab color="secondary" aria-label="add" onClick={handleClick ({ vertical: 'top', horizontal: 'right', })}>
                            <img src="img/mdi_basket-plus.png"></img>
                        </Fab>
                    </CardActions>
                </Card>
            </Grid>
        </div>
    );
}


export default Product;