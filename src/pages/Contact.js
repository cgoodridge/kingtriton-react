import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/PhoneAndroid';
import LocationIcon from '@material-ui/icons/PinDrop';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { createTheme } from '@material-ui/core/styles';


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
    justifyContent: 'center'
  },

  gridItemContent:{
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    flexDirection: 'column'
  },
  mainFont:{
    fontFamily: 'Poiret One'
  },
  underline: {
    "&&&:before": {
        borderBottom: "none"
    },
    "&&:after": {
        borderBottom: "none"
    }
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Contact() {

  const classes = useStyles();
  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#2196f3',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

    return (
        <div className="App" theme={theme} style={{padding: '25px'}}>
        <Container maxWidth="lg">
            <Typography gutterBottom variant="h3" component="h2" align="left" className={classes.mainFont}>
                    Contact Us
            </Typography>
        </Container>

            <Grid container direction="row" className={classes.gridContent}>
              <Grid item xs={12} sm={6}>
                  <Grid container>
                    <ThemeProvider theme={theme}>
                      <Grid item xs={6} style={{paddingRight: '20px', paddingBottom: '20px'}}>
                        <TextField 
                          id="standard-basic" 
                          fullWidth 
                          label="Name"                            
                                               
                        />
                      </Grid>

                      <Grid item xs={6} style={{paddingBottom: '20px'}}>
                        <TextField 
                          id="standard-basic" 
                          fullWidth label="Email" 
                          color="primary"
                          
                           
                       />
                      </Grid>

                      <Grid item xs={12} style={{paddingBottom: '20px'}}>
                        <TextField 
                          fullWidth 
                          id="standard-basic" 
                          label="Subject" 
                          color="primary"
                          
                        />
                    
                      </Grid>

                      <Grid item xs={12} style={{paddingBottom: '20px'}}>
                      <TextField
                        id="standard-multiline-static"
                        label="Multiline"
                        fullWidth
                        multiline
                        rows={4}
                        
                      />
                      </Grid>
                      
                        <Button variant="contained" color="primary" style={{width: 100}}>
                          Send
                        </Button>
                      </ThemeProvider>
                  </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <img style={{paddingLeft: '15px', paddingBottom: '20px', minWidth:'200px'}} className="responsive-img" src="./img/Mapsicle-Map.png"></img>
              </Grid>
            </Grid>

            <ThemeProvider theme={theme}>
              <Grid container direction="row" className={classes.gridContent}>
                <Grid item  xs={12} sm={4} className={classes.gridItemContent}>
                  <MailIcon style={{ fontSize: 40 }} color="primary"/>
                  <Typography gutterBottom variant="h4" component="h2" align="center" className={classes.mainFont}>
                        info@triton
                  </Typography>
                </Grid>
                <Grid item  xs={12} sm={4} className={classes.gridItemContent}>
                  <PhoneIcon style={{ fontSize: 40 }} color="primary"/>
                  <Typography gutterBottom variant="h5" component="h2" align="center" className={classes.mainFont}>
                        (246)439-9000
                  </Typography>
                </Grid>
                <Grid item  xs={12} sm={4} className={classes.gridItemContent}>
                  <LocationIcon style={{ fontSize: 40 }} color="primary"/>
                  <Typography gutterBottom variant="h5" component="h2" align="center" className={classes.mainFont}>
                        Hastings Main Road, Christ Church
                  </Typography>
                </Grid>
              </Grid>
            </ThemeProvider>

        </div>
    );
}

export default Contact;
