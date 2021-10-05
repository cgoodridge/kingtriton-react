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
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker'; 
import AdapterMoment from '@mui/lab/AdapterMoment';
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';



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
    display: 'flex ',
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
    value: 'couple1',
    label: 'C1 - Couple Table 1',
  },
  {
    value: 'couple2',
    label: 'C2 - Couple Table 2',
  },
  {
    value: 'couple4',
    label: 'C3 - Couple Table 3',
  },
  {
    value: 'couple4',
    label: 'C4 - Couple Table 4',
  },
  {
    value: 'family1',
    label: 'F1 - Family Table 1',
  },
  {
    value: 'family2',
    label: 'F2 - Family Table 2',
  },
  {
    value: 'family3',
    label: 'F3 - Family Table 3',
  },
  {
    value: 'family4',
    label: 'F4 - Family Table 4',
  },
  {
    value: 'family5',
    label: 'F5 - Family Table 5',
  },
  {
    value: 'family6',
    label: 'F6 - Family Table 6',
  },
  {
    value: 'family3',
    label: 'F7 - Family Table 7',
  },
  {
    value: 'family4',
    label: 'F8 - Family Table 8',
  },
];

function Reservations() {

  const [selectedTable, setSelectedTable] = useState('');
  const [occasion, setOccasion] = useState('');
  const [partySize, setPartySize] = useState(1);
  const [dateTimeValue, setDateTimeValue] = useState(new Date());
  const user = useSelector(selectUser);


  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };

  const handleResevation = (e) => {
    e.preventDefault();
    db
      .collection('users')
      .doc(user?.uid)
      .collection('reservations')
      .doc()
      .set({
        partySize: partySize,
        occasion: occasion,
        dateTime: dateTimeValue,
        table: selectedTable,
      })
      .catch(error => alert(error.message))

      // TODO - Show confirmation dialog and clear form
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
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Date &amp; Time"
                            fullWidth
                            value={dateTimeValue}
                            margin="normal"
                            onChange={(newValue) => {
                              setDateTimeValue(newValue);
                            }}
                          />
                        </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3} style={{paddingRight: '20px', paddingBottom: '20px'}}>
                          <TextField 
                            id="occasion" 
                            fullWidth
                            type="text"
                            label="Occasion (Optional)" 
                            value={occasion} 
                            onChange={e => setOccasion(e.target.value)}
                            color="primary"
                            margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3} style={{paddingRight: '20px', paddingBottom: '20px'}}>
                          <TextField 
                            id="partySize" 
                            fullWidth
                            label="People" 
                            type="number"
                            value={partySize} 
                            onChange={e => setPartySize(e.target.value)}
                            color="primary"
                            margin="dense"
                            required
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
                              margin="dense"
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
                          <Button variant="contained" color="primary" type="submit" onClick={handleResevation} style={{width: 100, marginBottom:"16px"}}>
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
