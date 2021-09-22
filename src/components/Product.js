import React from 'react';
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

import { useStateValue } from '../StateProvider';



const Product = ({food}) => {

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
                special: food.special
            }
        })

    }



    return (
        <div className={classes.root} key={food.id}>
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
                                            <IconButton color="secondary" size="small" style={{backgroundColor: "#2196f3"}}>
                                                <RemoveIcon fontSize="inherit" />
                                            </IconButton> 

                                            <input type="text" min="0" defaultValue={food.quantity}></input>
                                            {/* <span>{food.quantity}</span> */}

                                            <IconButton color="secondary" size="small" style={{backgroundColor: "#2196f3"}}>
                                                <AddIcon fontSize="inherit"/> 
                                            </IconButton> 
                                        </div>
                                    </Box>
                                
                                    <Fab color="secondary" aria-label="add" onClick={addToBasket}>
                                        <img src="img/mdi_basket-plus.png"></img>
                                    </Fab>
                                    
                                </CardActions>
                            </Card>
                        </Grid>
                    </div>
    );
}


export default Product;