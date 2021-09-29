import React, { useState } from 'react';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { createTheme } from '@material-ui/core/styles';
import MenuItem from '@mui/material/MenuItem';
import { db } from '../firebaseConfigFile';
import { useStateValue } from '../StateProvider';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  gridContent:{
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap'
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

const tables = [
  {
    value: 'home',
    label: 'Home',
  },
  {
    value: 'school',
    label: 'School',
  },
  {
    value: 'work',
    label: 'Work',
  },
];

function Reservations() {

  const [selectedTable, setSelectedTable] = useState('');
  const [{ user }, dispatch] = useStateValue();

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };

  const handleResevation = (e) => {
    e.preventDefault();
    db
      .collection('users')
      .doc(user?.uid)
      .collection('storedAddresses')
      .doc()
      .set({
        defaultAddress: 'addressState',
        name: 'addressName',
        addressLine1: 'addressLine1',
        addressLine2: 'addressLine2',
        parish: 'parish',
        directions: 'directions'
      })
      .catch(error => alert(error.message))

  };


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
          <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
              <Typography gutterBottom variant="h3" component="h2" align="left" className={classes.mainFont}>
                      Make a Reservation
              </Typography>

              <ThemeProvider theme={theme}>
                <form action="" style={{width: '100%'}}>
                  <Grid container direction="row" className={classes.gridContent}>
                        <Grid item xs={12} md={6} lg={3} style={{paddingRight: '20px', paddingBottom: '20px'}}>
                          <TextField 
                            id="standard-basic" 
                            fullWidth
                            type="date"
                            placeholder="test"
                            label="Date"                            
                         
                          />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3} style={{paddingRight: '20px', paddingBottom: '20px'}}>
                          <TextField 
                            id="standard-basic" 
                            fullWidth
                            type="time"
                            label="Time" 
                            color="primary"
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3} style={{paddingRight: '20px', paddingBottom: '20px'}}>
                          <TextField 
                            id="standard-basic" 
                            fullWidth
                            label="People" 
                            color="primary"
                            
                          />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3} style={{paddingRight: '20px', paddingBottom: '20px'}}>
                          <TextField
                              id="standard-select-table"
                              select
                              required
                              fullWidth
                              value={selectedTable} 
                              onChange={e => setSelectedTable(e.target.value)}
                              label="Table"
                              margin="normal"
                              variant="standard"
                          >
                          {tables.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                          ))}
                          </TextField>

                        </Grid>
                        {/* <Grid item xs={3} style={{paddingRight: '20px', paddingBottom: '20px'}}> */}
                        <div>
                          <Button variant="contained" color="primary" type="submit" style={{width: 100, marginBottom:"16px"}}>
                            Book
                          </Button>
                        </div>
                          
                        {/* </Grid> */}
                    </Grid>
                  </form>
                  
                </ThemeProvider>

              <Typography gutterBottom variant="h4" component="h2" align="left" className={classes.mainFont}>
                Preferred Seating
              </Typography>
              
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
