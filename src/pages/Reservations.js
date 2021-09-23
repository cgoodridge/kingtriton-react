import React from 'react';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
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
    justifyContent: 'start'
  },
  mainFont:{
    fontFamily: 'Poiret One'
  },
  resArea:{
    backgroundColor: '#1e1e1e',
    height: 650,
    marginTop: 16,
    paddingTop: 16,
    paddingLeft: 20,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden'
  },

  innerGrid:{
    
    display: 'flex',
    flexDirection: 'row wrap',
    justifyContent: 'flex-start',
    
    overflow: 'hidden'
  }
}));

function Reservations() {

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

    const cardInfo = [
        {image: "img/mains/shrimpalfredo.jpg", name: "Shrimp Alfredo", price:16,},
        {image: "img/mains/lobster-mac.jpg", name: "Lobster Mac & Cheese", price:22,},
        {image: "img/mains/fried-calamari.jpeg", name: "Fried Calamari", price:16,},
        {image: "img/mains/fried-calamari.jpeg", name: "Fried Calamari", price:16,},

    ];


    return (
        <div className="App" theme={theme} style={{padding: '25px'}}>
          <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
              <Typography gutterBottom variant="h3" component="h2" align="left" className={classes.mainFont}>
                      Make a Reservation
              </Typography>

              <ThemeProvider theme={theme}>
                <Grid container direction="row" className={classes.gridContent}>
                  <Grid item xs={12}>
                      <Grid container>
                          <Grid item xs={3} style={{paddingRight: '20px', paddingBottom: '20px'}}>
                            <TextField 
                              id="standard-basic" 
                              fullWidth 
                              label="Date"                            
                              InputProps={{ 
                                disableUnderline: true,     
                              }}                          
                            />
                          </Grid>
                          <Grid item xs={3} style={{paddingRight: '20px', paddingBottom: '20px'}}>
                            <TextField 
                              id="standard-basic" 
                              fullWidth 
                              label="Time" 
                              color="primary"
                              InputProps={{ 
                                
                                disableUnderline: true,                           
                              }}/>
                          </Grid>
                          <Grid item xs={3} style={{paddingRight: '20px', paddingBottom: '20px'}}>
                            <TextField 
                              id="standard-basic" 
                              fullWidth 
                              label="People" 
                              color="primary"
                              InputProps={{   
                                disableUnderline: true,                           
                              }}
                            />
                          </Grid>
                          <Grid item xs={3} style={{paddingRight: '20px', paddingBottom: '20px'}}>
                            <TextField 
                              id="standard-basic" 
                              fullWidth 
                              label="Table" 
                              color="primary"
                              InputProps={{   
                                disableUnderline: true,                           
                              }}
                            />
                          </Grid>
                          <Grid item xs={3} style={{paddingRight: '20px', paddingBottom: '20px'}}>
                            <Button variant="contained" color="primary" style={{width: 100}}>
                              Book
                            </Button>
                          </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </ThemeProvider>

              <Typography gutterBottom variant="h4" component="h2" align="left" className={classes.mainFont}>
                Preferred Seating
              </Typography>
              <Chip
                style={{margin: 4}}
                label="Lower Floor"
                clickable
                color="primary"
              />
              <Chip
                style={{margin: 4}}
                label=" Upper Floor"
                clickable
                color="#010101"
              />
              <Grid container className={classes.resArea}>
                  <Grid item xs={12} sm={2}>
                    <Grid container style={{display: 'flex', flexDirection:'column'}}>
                      <Grid >
                        <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                          P6
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img src="img/seating/Seating Area 20.png" className="seating"></img>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Grid container style={{display: 'flex', flexDirection:'column'}}>
                      <Grid item>
                        <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                          P5
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img src="img/seating/Seating Area 20.png" className="seating"></img>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Grid container style={{display: 'flex', flexDirection:'column'}}>
                      <Grid >
                        <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                          C4
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img src="img/seating/Seating Area 8.png" className="seating"></img>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Grid container style={{display: 'flex', flexDirection:'column'}}>
                      <Grid >
                        <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                          C3
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img src="img/seating/Seating Area 8.png" className="seating"></img>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Grid container style={{display: 'flex', flexDirection:'column'}}>
                      <Grid >
                        <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                          C2
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img src="img/seating/Seating Area 8.png" className="seating"></img>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Grid container style={{display: 'flex', flexDirection:'column'}}>
                      <Grid >
                        <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                          C1
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img src="img/seating/Seating Area 8.png" className="seating"></img>
                      </Grid>
                    </Grid>
                  </Grid>


                  <Grid item xs={12} sm={2}>
                    <Grid container style={{display: 'flex', flexDirection:'column'}}>
                      <Grid >
                        <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                          P4
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img src="img/seating/Seating Area 20.png" className="seating"></img>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Grid container style={{display: 'flex', flexDirection:'column'}}>
                      <Grid >
                        <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                          P3
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img src="img/seating/Seating Area 20.png" className="seating"></img>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Grid container style={{display: 'flex', flexDirection:'column'}}>
                      <Grid >
                        <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                          F8
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img src="img/seating/Seating Area 1.png" className="seating"></img>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Grid container style={{display: 'flex', flexDirection:'column'}}>
                      <Grid >
                        <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                          F7
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img src="img/seating/Seating Area 1.png" className="seating"></img>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Grid container style={{display: 'flex', flexDirection:'column'}}>
                      <Grid >
                        <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                          F6
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img src="img/seating/Seating Area 1.png" className="seating"></img>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Grid container style={{display: 'flex', flexDirection:'column'}}>
                      <Grid >
                        <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                          F5
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img src="img/seating/Seating Area 1.png" className="seating"></img>
                      </Grid>
                    </Grid>
                  </Grid>


                  <Grid item xs={12} sm={2}>
                    <Grid container style={{display: 'flex', flexDirection:'column'}}>
                      <Grid >
                        <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                          P2
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img src="img/seating/Seating Area 20.png" className="seating"></img>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Grid container style={{display: 'flex', flexDirection:'column'}}>
                      <Grid >
                        <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                          P1
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img src="img/seating/Seating Area 20.png" className="seating"></img>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Grid container style={{display: 'flex', flexDirection:'column'}}>
                      <Grid >
                        <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                          F4
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img src="img/seating/Seating Area 1.png" className="seating"></img>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Grid container style={{display: 'flex', flexDirection:'column'}}>
                      <Grid >
                        <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                          F3
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img src="img/seating/Seating Area 1.png" className="seating"></img>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Grid container style={{display: 'flex', flexDirection:'column'}}>
                      <Grid >
                        <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                          F2
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img src="img/seating/Seating Area 1.png" className="seating"></img>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Grid container style={{display: 'flex', flexDirection:'column'}}>
                      <Grid >
                        <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                          F1
                        </Typography>
                      </Grid>
                      <Grid item>
                        <img src="img/seating/Seating Area 1.png" className="seating"></img>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container className={classes.innerGrid}>

                    <Grid item xs={12} sm={3}>
                      <Grid container style={{display: 'flex', flexDirection:'column'}}>
                        <Grid >
                          <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                            B4
                          </Typography>
                        </Grid>
                        <Grid item>
                          <img src="img/seating/Seating Area 16.png" className="seating"></img>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Grid container style={{display: 'flex', flexDirection:'column'}}>
                        <Grid >
                          <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                            B3
                          </Typography>
                        </Grid>
                        <Grid item>
                          <img src="img/seating/Seating Area 16.png" className="seating"></img>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Grid container style={{display: 'flex', flexDirection:'column'}}>
                        <Grid >
                          <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                            B2
                          </Typography>
                        </Grid>
                        <Grid item>
                          <img src="img/seating/Seating Area 16.png" className="seating"></img>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Grid container style={{display: 'flex', flexDirection:'column'}}>
                        <Grid >
                          <Typography style={{color:'white'}} gutterBottom variant="h6"  component="h2"  className={classes.mainFont}>
                            B1
                          </Typography>
                        </Grid>
                        <Grid item>
                          <img src="img/seating/Seating Area 16.png" className="seating"></img>
                        </Grid>
                      </Grid>
                    </Grid>
                    

                  </Grid>
                
              </Grid>
            </Container>
          </ThemeProvider>
        </div>
    );
}

export default Reservations;
