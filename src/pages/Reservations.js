import React, { useEffect, useState } from 'react';
import { makeStyles, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { db } from '../firebaseConfigFile';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
// import { DateField } from '@mui/x-date-pickers/DateField';
// import { TimeField } from '@mui/x-date-pickers/TimeField';
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import '../css/reservation.css';
import { Link, useHistory } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';

const useStyles = makeStyles(() => ({
    divider: {
        height: '1px',
        width: '100%',
        maxWidth: '100%',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
    },
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

function Reservations() {

    const [selectedTable, setSelectedTable] = useState('');
    const [isSelected, isTableSelected] = useState(false);
    const [occasion, setOccasion] = useState('');
    // const [reservationName, setReservationName] = useState('');
    // const [reservationEmail, setReservationEmail] = useState('');
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
                db
                    .collection('reservations')
                    .doc()
                    .set({
                        dateTime: dateTimeValue.toDate(),
                        table: selectedTable,
                    })
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
                    <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_tia15mzy.json" background="transparent" speed="1" style={{ width: '300px', height: '300px' }} loop autoplay></lottie-player>
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
                            </Grid>
                        </form>
                    </ThemeProvider>
                    <Divider variant="middle" className={classes.divider}/>
                    <Typography gutterBottom variant="h3" component="h2" align="left" className={classes.mainFont}>
                        General Queries
                    </Typography>
                    <Grid container direction="row" className={classes.gridContent}>
                        <Grid item xs={12} sm={6}>
                            <Grid container>

                                <Grid item xs={12} style={{ paddingBottom: '20px' }}>
                                    <TextField
                                        id="standard-basic"
                                        fullWidth
                                        label="Name"

                                    />
                                </Grid>

                                <Grid item xs={12} style={{ paddingBottom: '20px' }}>
                                    <TextField
                                        id="standard-basic"
                                        fullWidth
                                        label="Email"
                                        color="primary"
                                    />
                                </Grid>

                                <Grid item xs={12} style={{ paddingBottom: '20px' }}>
                                    <TextField
                                        fullWidth
                                        id="standard-basic"
                                        label="Subject"
                                        color="primary"
                                    />
                                </Grid>

                                <Grid item xs={12} style={{ paddingBottom: '20px' }}>
                                    <TextField
                                        id="standard-multiline-static"
                                        label="Message"
                                        fullWidth
                                        multiline
                                    />
                                </Grid>

                                <Button variant="contained" color="primary" style={{ width: 100 }}>
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <img style={{ paddingLeft: '15px', paddingBottom: '20px' }} className="responsive-img" src="./img/Mapsicle-Map.png" alt="Map screengrab"></img>
                        </Grid>
                    </Grid>

                    {/* <Grid container direction="row" className={classes.gridContent}>
                        <Grid item xs={12} sm={4} className={classes.gridItemContent}>
                            <MailIcon style={{ fontSize: 40 }} color="primary" />
                            <Typography gutterBottom variant="h4" component="h2" align="center" className={classes.mainFont}>
                                info@triton
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} className={classes.gridItemContent}>
                            <PhoneIcon style={{ fontSize: 40 }} color="primary" />
                            <Typography gutterBottom variant="h5" component="h2" align="center" className={classes.mainFont}>
                                (246)439-9000
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} className={classes.gridItemContent}>
                            <LocationIcon style={{ fontSize: 40 }} color="primary" />
                            <Typography gutterBottom variant="h5" component="h2" align="center" className={classes.mainFont}>
                                Hastings Main Road, Christ Church
                            </Typography>
                        </Grid>
                    </Grid> */}

                </Container>
            </ThemeProvider>
        </div>
    );
}

export default Reservations;
