import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const MenuList = ({ foods, specialVal }) => {
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
                {foods.filter(foods => foods.special === specialVal).map((food, key) => {
                    return (
                    <div className={classes.root}>
                        <Grid item xs={12} sm={3} key={key} className={classes.card}>
                            <Card className="card small" style={{borderRadius: "20px"}} key={food.id}>
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
                                        <IconButton size="small" color="secondary">
                                        <RemoveIcon />
                                        </IconButton>
                                        <TextField id="filled-basic" className="cardCount" InputProps={{ disableUnderline: true }} defaultValue="1" size="small" />
                                        <IconButton size="small" color="secondary">
                                        <AddIcon />
                                        </IconButton>
                                    </Box>
                                
                                    <Fab color="secondary" aria-label="add" >
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




export default MenuList;