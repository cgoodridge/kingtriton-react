import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { addToCart } from './actions/cartActions'

const MenuList = (props) => {

    const handleClick = (id)=>{
        props.addToCart(id); 
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        card: {
          padding: theme.spacing(1),
        },
    }));

    const classes = useStyles();
      
    return(
        // TODO: Alter code so it's possible to display all food items on the main menu page, without excluding the special items
            <>
                {props.items.filter(item => item.special === props.specialVal).map((food, key) => {
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
                                
                                    <Fab color="secondary" aria-label="add" onClick={()=>{handleClick(food.id)}}>
                                        <img src="img/mdi_basket-plus.png"></img>
                                    </Fab>
                                    
                                </CardActions>
                            </Card>
                        </Grid>
                    </div>
                    
                    );
                    
                })}
                    
            </>
        );
}

const mapStateToProps = (state)=>{
    return {
      items: state.items
    }
  }
  
  const mapDispatchToProps= (dispatch)=>{
      
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
  }
      
  


export default connect(mapStateToProps, mapDispatchToProps) (MenuList);