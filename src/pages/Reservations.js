import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { db } from '../firebaseConfigFile';
import { collection, doc, setDoc } from 'firebase/firestore';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import '../css/reservation.css';
import { Link, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';

function Reservations() {

    const [selectedTable, setSelectedTable] = useState('');
    const [isSelected, isTableSelected] = useState(false);
    const [occasion, setOccasion] = useState('');
    // const [reservationName, setReservationName] = useState('');
    // const [reservationEmail, setReservationEmail] = useState('');
    const [partySize, setPartySize] = useState(1);
    const [dateTimeValue, setDateTimeValue] = useState(moment().startOf('hour').add(2, 'hour'));
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [openConfirmMessage, setOpenConfirmMessage] = useState(false);

    const handleClickOpen = () => {
        setOpenConfirmMessage(true);
    };

    const handleClose = () => {
        setOpenConfirmMessage(false);
        navigate('/account');
    };

    const handleDateChange = (newValue) => {
        setDateTimeValue(moment(newValue));
    };

    useEffect(() => {
        if (selectedTable === 'none') {
            isTableSelected(false);
        }
    }, [selectedTable]);

    const handleReservation = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!user) {
            alert('You must be signed in to make a reservation.');
            setLoading(false);
            return;
        }

        try {
            // Add reservation to the global reservations collection
            await setDoc(doc(collection(db, 'reservations')), {
                dateTime: dateTimeValue.toDate(),
                userUid: user?.uid,
                partySize: partySize,
                occasion: occasion
            });

            // Reset state and show confirmation
            setPartySize(1);
            setOccasion('');
            setDateTimeValue(moment().startOf('hour').add(2, 'hour'));
            setSelectedTable('none');
            setLoading(false);
            handleClickOpen();
        } catch (error) {
            console.log("error ", error);

            alert(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="App" style={{ padding: '25px' }}>
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
            <Container maxWidth="lg">
                <Typography gutterBottom variant="h4" component="h4" align="left" className="mainFont">
                    Make a Reservation
                </Typography>
                <form action="" style={{ width: '100%' }}>
                    <Grid container className="gridContent">
                        <Grid xs={12} md={6} lg={3} style={{ paddingRight: '20px', paddingTop: '5px', paddingBottom: '20px' }}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DateTimePicker
                                    label="Select Date and Time"
                                    value={dateTimeValue}
                                    onChange={handleDateChange}
                                    minutesStep={15}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid xs={12} md={6} lg={3} style={{ paddingRight: '20px', paddingBottom: '20px' }}>
                            <TextField
                                id="occasion"
                                fullWidth
                                type="text"
                                label="Occasion (Optional)"
                                value={occasion}
                                onChange={e => setOccasion(e.target.value)}
                                color="primary"
                                margin="dense"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid xs={12} md={6} lg={3} style={{ paddingRight: '20px', paddingBottom: '20px' }}>
                            <TextField
                                id="partySize"
                                fullWidth
                                label="People"
                                type="number"
                                value={partySize}
                                onChange={e => setPartySize(e.target.value)}
                                color="primary"
                                margin="dense"
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <div>
                            {user ?
                                <Box sx={{ mt: 1, mb: 1, position: 'relative' }}>
                                    <Button className='resButton' variant="contained" color="secondary" disabled={loading} type="submit" onClick={handleReservation} style={{ width: 100, marginBottom: '16px' }}>
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
                                    <Button className='resButton' variant="contained" color="secondary" component={Link} to="/login" style={{ width: 150, marginBottom: '16px' }}>
                                        Sign In To Book
                                    </Button>
                                </Box>
                            }
                        </div>
                    </Grid>
                </form>

                <Divider variant="middle" className="divider"/>
                <Typography gutterBottom variant="h4" component="h4" align="left" className="mainFont">
                    General Queries
                </Typography>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Grid container spacing={2}>
                            <Grid size={6} xs={12} style={{ paddingBottom: '20px' }}>
                                <TextField
                                    id="standard-basic"
                                    fullWidth
                                    label="Name"
                                />
                            </Grid>
                            <Grid size={6} xs={12} style={{ paddingBottom: '20px' }}>
                                <TextField
                                    id="standard-basic"
                                    fullWidth
                                    label="Email"
                                    color="primary"
                                />
                            </Grid>
                            <Grid size={12} xs={12} style={{ paddingBottom: '20px' }}>
                                <TextField
                                    fullWidth
                                    id="standard-basic"
                                    label="Subject"
                                    color="primary"
                                />
                            </Grid>

                            <Grid size={12} xs={12} style={{ paddingBottom: '20px' }}>
                                <TextField
                                    id="standard-multiline-static"
                                    label="Message"
                                    fullWidth

                                />
                            </Grid>
                            <Button className='resButton' variant="contained" color="secondary" style={{ width: 100 }}>
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <img style={{ paddingLeft: '15px', paddingBottom: '20px' }} className="responsive-img" src="./img/Mapsicle-Map.png" alt="Map screengrab"></img>
                    </Grid>
                </Grid>

                {/* <Grid container direction="row" className="gridContent">
                    <Grid item xs={12} sm={4} className={classes.gridItemContent}>
                        <MailIcon style={{ fontSize: 40 }} color="primary" />
                        <Typography gutterBottom variant="h4" component="h2" align="center" className="mainFont">
                            info@triton
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.gridItemContent}>
                        <PhoneIcon style={{ fontSize: 40 }} color="primary" />
                        <Typography gutterBottom variant="h5" component="h2" align="center" className="mainFont">
                            (246)439-9000
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.gridItemContent}>
                        <LocationIcon style={{ fontSize: 40 }} color="primary" />
                        <Typography gutterBottom variant="h5" component="h2" align="center" className="mainFont">
                            Hastings Main Road, Christ Church
                        </Typography>
                    </Grid>
                </Grid> */}

            </Container>
        </div>
    );
}

export default Reservations;
