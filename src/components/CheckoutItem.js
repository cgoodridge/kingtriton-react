import React from 'react'
import '../css/checkoutItem.css';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../StateProvider';
import { removeFromCart } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems } from '../slices/cartSlice';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    controlCounters: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      
  
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  
    formSize:{
      width: 20,
      paddingTop: 0,
      paddingBottom: 0,
      textAlign: 'center'
    
    },
    cardRadius:{
      borderRadius: 10,
    },
  
    gridContent:{
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
  
    contentPadding:{
      paddingTop: '16px',
      paddingBottom: '16px',
    },
    cardPadding: {
      paddingRight: '8px',
      paddingLeft: '8px'
    }
  }));

function CheckoutItem({id, name, image, price}) {
    const classes = useStyles();

    const dispatch = useDispatch();
    const cart = useSelector(selectItems);

    // const [{cart}, dispatch] = useStateValue();

    const removeItemFromCart = () => {
        // const prodId = { id:props.id }
        dispatch(removeFromCart({ id }));
    }

    return (
        <> 
            <Card className='checkoutItem'>
                <Grid container direction="row">
                    <Grid item xs={6}>
                        <img src={image} alt={name} className='card-image-alt'/>
                    </Grid>
                    <Grid item xs={6} direction="column" container justifyContent="space-around">
                        <CardContent>
                            <Grid container direction="column" justifyContent="space-between">
                                <Grid item container direction="row" justifyContent="space-between">
                                    <Grid item xs={10}>
                                        <Typography gutterBottom variant="subtitle1" component="div" style={{verticalAlign: 'middle'}}>
                                            {name}
                                        </Typography>
                                    </Grid>
                                    
                                    <Grid item xs={2} alignItems="center">
                                        <IconButton aria-label="close" style={{marinRight: '8px'}} onClick={removeItemFromCart}> 
                                            <CloseIcon/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <pre>

                                </pre>
                                <Grid>
                                    <Typography variant="body2" gutterBottom>
                                            This is a description
                                    </Typography>
                                </Grid>
                                <pre>


                                    
                                </pre>
                                <Grid>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                        <>
                                            <p>
                                            <strong>{value}</strong>
                                            </p>
                                        </>
                                        )}
                                        decimalScale={2}
                                        value={price} 
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>    
                    </Grid>
                </Grid>
            </Card>
        </>
       
    )
}

export default CheckoutItem;
