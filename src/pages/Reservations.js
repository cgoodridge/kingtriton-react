import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { createTheme } from '@material-ui/core/styles';
import MenuItem from '@mui/material/MenuItem';
import { db } from '../firebaseConfigFile';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterMoment from '@mui/lab/AdapterMoment';
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import '../css/reservation.css';
import { Link, useHistory } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  gridContent: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap'
  },
  mainFont: {
    fontFamily: 'Poiret One',
    // position: 'absolute'
  },

  resArea: {
    backgroundColor: '#1e1e1e',
    height: 650,
    minWidth: '100%',
    marginTop: 16,
    paddingTop: 16,
    paddingLeft: 20,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    overflowX: 'auto'
  },

  innerGrid: {
    display: 'flex',
    flexDirection: 'row wrap',
    justifyContent: 'flex-start',
    overflow: 'hidden'
  }
}));

const tables = [
  {
    value: 'none',
    label: 'None Selected',
  },
  {
    value: 'couple1',
    label: 'Table C1, Ocean Front',
  },
  {
    value: 'couple2',
    label: 'Table C2, Ocean Front',
  },
  {
    value: 'couple3',
    label: 'Table C3, Ocean Front',
  },
  {
    value: 'couple4',
    label: 'Table C4, Ocean Front',
  },
  {
    value: 'sGroup1',
    label: 'Table G1',
  },
  {
    value: 'sGroup2',
    label: 'Table G2',
  },
  {
    value: 'sGroup3',
    label: 'Table G3',
  },
  {
    value: 'sGroup4',
    label: 'Table G4',
  },
  {
    value: 'sGroup5',
    label: 'Table G5',
  },
  {
    value: 'sGroup6',
    label: 'Table G6',
  },
  {
    value: 'sGroup7',
    label: 'Table G7',
  },
  {
    value: 'sGroup8',
    label: 'Table G8',
  },
  {
    value: 'party1',
    label: 'Table P1',
  },
  {
    value: 'party2',
    label: 'Table P2',
  },
  {
    value: 'party3',
    label: 'Table P3',
  },
  {
    value: 'party4',
    label: 'Table P4',
  },
  {
    value: 'party5',
    label: 'Table P5, Ocean Front',
  },
  {
    value: 'party6',
    label: 'Table P6, Ocean Front',
  },
  {
    value: 'booth4',
    label: 'Booth 4',
  },
  {
    value: 'booth3',
    label: 'Booth 3',
  },
  {
    value: 'booth2',
    label: 'Booth 2',
  },
  {
    value: 'booth1',
    label: 'Booth 1',
  },
];

function Reservations() {

  const [selectedTable, setSelectedTable] = useState('');
  const [isSelected, isTableSelected] = useState(false);
  const [occasion, setOccasion] = useState('');
  const [reservationName, setReservationName] = useState('');
  const [reservationEmail, setReservationEmail] = useState('');
  const [partySize, setPartySize] = useState(1);
  const [dateTimeValue, setDateTimeValue] = useState(new Date());
  const user = useSelector(selectUser);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [openConfirmMessage, setOpenConfirmMessage] = useState(false);

  const handleClickOpen = () => {
    setOpenConfirmMessage(true);
  };

  const handleClose = () => {
    setOpenConfirmMessage(false);
    history.push('/account');
  };

  const getTableId = (e) => {
    isTableSelected(true);
    setSelectedTable(e.target.id);
  };


  useEffect(() => {
    if (selectedTable === 'none') {
      isTableSelected(false);
    }
  }, [selectedTable]);

  const handleReservation = (e) => {
    e.preventDefault();
    setLoading(true);
    if (selectedTable === 'none') {
      alert("Please select a table");
      return;
    }
    db
      .collection('users')
      .doc(user?.uid)
      .collection('reservations')
      .doc()
      .set({
        partySize: partySize,
        occasion: occasion,
        dateTime: dateTimeValue.toDate(),
        table: selectedTable,
      })
      .then(() => {
        setPartySize(1);
        setOccasion('');
        setDateTimeValue('');
        setSelectedTable('none');
        setLoading(false);
        handleClickOpen();
      })
      .catch(error => alert(error.message));
      // setTimeout(() => history.push('/account'), 3000);
      


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
    <div className="App" theme={theme} style={{ padding: '25px' }}>
      <Dialog
        open={openConfirmMessage}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Reservation Made!
        </DialogTitle>
        <DialogContent className="resConfirmed">
          <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_tia15mzy.json" background="transparent" speed="1" style={{width: '300px', height: '300px'}} loop autoplay></lottie-player>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <Typography gutterBottom variant="h3" component="h2" align="left" className={classes.mainFont}>
            Make a Reservation
          </Typography>

          <ThemeProvider theme={theme}>
            <form action="" style={{ width: '100%' }}>
              <Grid container direction="row" className={classes.gridContent}>
                <Grid item xs={12} md={6} lg={3} style={{ paddingRight: '20px', paddingTop: '5px', paddingBottom: '20px' }}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Date &amp; Time"
                      fullWidth
                      value={dateTimeValue}
                      margin="dense"
                      onChange={(newValue) => {
                        setDateTimeValue(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6} lg={3} style={{ paddingRight: '20px', paddingBottom: '20px' }}>
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
                <Grid item xs={12} md={6} lg={3} style={{ paddingRight: '20px', paddingBottom: '20px' }}>
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
                <Grid item xs={12} md={6} lg={3} style={{ paddingRight: '20px', paddingBottom: '20px' }}>
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
                  {user ?
                    <Box sx={{ mt: 1, mb: 1, position: 'relative' }}>
                      <Button variant="contained" disabled={loading} color="primary" type="submit" onClick={handleReservation} style={{ width: 100, marginBottom: '16px' }}>
                        Book
                      </Button>
                      {loading && (
                        <CircularProgress
                          size={24}
                          sx={{
                            color: "#2196f3",
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                          }}
                        />

                      )}

                    </Box>

                    :
                    <Box>
                      <Button variant="contained" color="primary" component={Link} to="/login" style={{ width: 150, marginBottom: '16px' }}>
                        Sign In To Book
                      </Button>
                    </Box>


                  }

                </div>
                {/* </Grid> */}
              </Grid>
            </form>
          </ThemeProvider>

          <Typography gutterBottom variant="h4" component="h2" align="left" className={classes.mainFont}>
            Preferred Seating
          </Typography>

          <div className="responsiveBooking">
            <Box container className={classes.resArea}>
              <Box className="bookingArea">
                {/* <Reservationbooking /> */}
                <div className={isSelected && selectedTable === 'party6' ? "tableContainerSelected" : "tableContainer"} >
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      P6
                    </Typography>
                  </div>
                  <img id="party6" onClick={getTableId} src="img/seating/Seating Area 20.png" alt="seating graphic" className="seating"></img>
                </div>

                <div className={isSelected && selectedTable === 'party5' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      P5
                    </Typography>
                  </div>
                  <img id="party5" onClick={getTableId} src="img/seating/Seating Area 20.png" alt="seating graphic" className="seating"></img>
                </div>
                <div className={isSelected && selectedTable === 'couple4' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      C4
                    </Typography>
                  </div>
                  <img id="couple4" onClick={getTableId} src="img/seating/Seating Area 8.png" alt="seating graphic" className="seating"></img>
                </div>
                <div className={isSelected && selectedTable === 'couple3' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      C3
                    </Typography>
                  </div>
                  <img id="couple3" onClick={getTableId} src="img/seating/Seating Area 8.png" alt="seating graphic" className="seating"></img>
                </div>
                <div className={isSelected && selectedTable === 'couple2' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      C2
                    </Typography>
                  </div>
                  <img id="couple2" onClick={getTableId} src="img/seating/Seating Area 8.png" alt="seating graphic" className="seating"></img>
                </div>
                <div className={isSelected && selectedTable === 'couple1' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      C1
                    </Typography>
                  </div>
                  <img id="couple1" onClick={getTableId} src="img/seating/Seating Area 8.png" alt="seating graphic" className="seating"></img>
                </div>
              </Box>
              <Box className="bookingArea">
                {/* <Reservationbooking /> */}
                <div className={isSelected && selectedTable === 'party4' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      P4
                    </Typography>
                  </div>
                  <img id="party4" onClick={getTableId} src="img/seating/Seating Area 20.png" alt="seating graphic" className="seating"></img>
                </div>

                <div className={isSelected && selectedTable === 'party3' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      P3
                    </Typography>
                  </div>
                  <img id="party3" onClick={getTableId} src="img/seating/Seating Area 20.png" alt="seating graphic" className="seating"></img>
                </div>
                <div className={isSelected && selectedTable === 'sGroup8' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      G8
                    </Typography>
                  </div>
                  <img id="sGroup8" onClick={getTableId} src="img/seating/Seating Area 1.png" alt="seating graphic" className="seating"></img>
                </div>
                <div className={isSelected && selectedTable === 'sGroup7' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      G7
                    </Typography>
                  </div>
                  <img id="sGroup7" onClick={getTableId} src="img/seating/Seating Area 1.png" alt="seating graphic" className="seating"></img>
                </div>
                <div className={isSelected && selectedTable === 'sGroup6' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      G6
                    </Typography>
                  </div>
                  <img id="sGroup6" onClick={getTableId} src="img/seating/Seating Area 1.png" alt="seating graphic" className="seating"></img>
                </div>
                <div className={isSelected && selectedTable === 'sGroup5' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      G5
                    </Typography>
                  </div>
                  <img id="sGroup5" onClick={getTableId} src="img/seating/Seating Area 1.png" alt="seating graphic" className="seating"></img>
                </div>
              </Box>
              <Box className="bookingArea">
                {/* <Reservationbooking /> */}
                <div className={isSelected && selectedTable === 'party2' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      P2
                    </Typography>
                  </div>
                  <img id="party2" onClick={getTableId} src="img/seating/Seating Area 20.png" alt="seating graphic" className="seating"></img>
                </div>

                <div className={isSelected && selectedTable === 'party1' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      P1
                    </Typography>
                  </div>
                  <img id="party1" onClick={getTableId} src="img/seating/Seating Area 20.png" alt="seating graphic" className="seating"></img>
                </div>
                <div className={isSelected && selectedTable === 'sGroup4' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      G4
                    </Typography>
                  </div>
                  <img id="sGroup4" onClick={getTableId} src="img/seating/Seating Area 1.png" alt="seating graphic" className="seating"></img>
                </div>
                <div className={isSelected && selectedTable === 'sGroup3' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      G3
                    </Typography>
                  </div>
                  <img id="sGroup3" onClick={getTableId} src="img/seating/Seating Area 1.png" alt="seating graphic" className="seating"></img>
                </div>
                <div className={isSelected && selectedTable === 'sGroup2' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      G2
                    </Typography>
                  </div>
                  <img id="sGroup2" onClick={getTableId} src="img/seating/Seating Area 1.png" alt="seating graphic" className="seating"></img>
                </div>
                <div className={isSelected && selectedTable === 'sGroup1' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      G1
                    </Typography>
                  </div>
                  <img id="sGroup1" onClick={getTableId} src="img/seating/Seating Area 1.png" alt="seating graphic" className="seating"></img>
                </div>
              </Box>
              <Box className="bookingArea">
                {/* <Reservationbooking /> */}

                <div className={isSelected && selectedTable === 'booth4' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      B4
                    </Typography>
                  </div>
                  <img id="booth4" onClick={getTableId} src="img/seating/Seating Area 16.png" alt="seating graphic" className="seating"></img>
                </div>
                <div className={isSelected && selectedTable === 'booth3' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      B3
                    </Typography>
                  </div>
                  <img id="booth3" onClick={getTableId} src="img/seating/Seating Area 16.png" alt="seating graphic" className="seating"></img>
                </div>
                <div className={isSelected && selectedTable === 'booth2' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      B2
                    </Typography>
                  </div>
                  <img id="booth2" onClick={getTableId} src="img/seating/Seating Area 16.png" alt="seating graphic" className="seating"></img>
                </div>
                <div className={isSelected && selectedTable === 'booth1' ? "tableContainerSelected" : "tableContainer"}>
                  <div className="tableCode">
                    <Typography gutterBottom variant="h6" component="h2" className="tableCode">
                      B1
                    </Typography>
                  </div>
                  <img id="booth1" onClick={getTableId} src="img/seating/Seating Area 16.png" alt="seating graphic" className="seating"></img>
                </div>
              </Box>
            </Box>
          </div>

        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Reservations;
