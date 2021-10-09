import React, { useState } from 'react';
import '../css/account.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Orders from './Orders';
import Accountdetails from './AccountDetails';
import Privacypolicy from './PrivacyPolicy';
import Help from './Help';
import Reservationhistory from './ReservationHistory';
import Badge from '@mui/material/Badge';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@material-ui/core/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import { selectUser, updateProfile } from '../slices/userSlice';
import { useSelector } from 'react-redux';
import { db, auth, storage } from '../firebaseConfigFile';
import { useDispatch } from 'react-redux';


const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Input = styled('input')({
    display: 'none',
});

const Account = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [value, setValue] = useState(0);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [imageUploadDialog, setImageUploadDialog] = useState(false);

    const handleClickOpen = () => {
        setImageUploadDialog(true);
    };

    const handleClose = () => {
        setImageUploadDialog(false);
    };

    const handleImageRemoval = () => {
        setSelectedFile();
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleFileUpload = (e) => {
        setSelectedFile(e.target.files[0]);

        if (e.target.files[0] !== null) {
            console.log('We have a file');
        } else {
            console.log('We do not have a file');
        }
    };

    const doUpload = () => {
        storage
            .ref(`users/${user.uid}/${selectedFile?.name}`)
            .put(selectedFile)
            .then(() => {
                storage
                    .ref(`users/${user.uid}/${selectedFile?.name}`)
                    .getDownloadURL()
                    .then((url) => {
                        auth.currentUser.updateProfile({
                            photoURL: url
                        })
                        .then(() =>{
                            dispatch(
                                updateProfile({
                                    photoURL: auth.currentUser.photoURL
                                }));
                        })
                        
                    })
            })
            .catch(error => alert(error.message))
        handleClose();
    };

    // console.log(user.photoURL);

    return (
        <>
            {/* Desktop View */}
            <Dialog open={imageUploadDialog} onClose={handleClose} sx={{ padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <DialogTitle sx={{ textAlign: 'center' }}>Upload Profile Picture</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ padding: '0 16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                            badgeContent={
                                <HighlightOffIcon onClick={handleImageRemoval} fontSize="large" sx={{ cursor: 'pointer' }} />
                            }
                        >
                            <Avatar src={selectedFile ? URL.createObjectURL(selectedFile) : ""} aria-label="upload picture" sx={{ backgroundColor: 'purple', width: 200, height: 200, marginleft: '180px', fontSize: '80px' }}>{user.displayName.charAt(0)}</Avatar>
                        </Badge>
                    </DialogContentText>
                    {selectedFile ? 
                    <TextField
                        autoFocus
                        margin={selectedFile ? "normal" : "none"}
                        id="name"
                        label={selectedFile ? "" : "FileName"}
                        aria-label="File name field"
                        type="text"
                        disabled
                        value={selectedFile ? selectedFile.name : null}
                        variant="standard"
                    />
                        :
                        null
                    }
                    
                    <label htmlFor="icon-button-file">
                        <Input accept="image/*" id="icon-button-file" type="file" onChange={handleFileUpload} />
                        <IconButton aria-label="upload picture" color="primary" component="span" style={{ marginTop: '16px' }}>
                            {selectedFile ? <EditIcon /> : <FileUploadIcon /> }
                        </IconButton>
                    </label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={doUpload}>Upload</Button>
                </DialogActions>
            </Dialog>

            {/* Make a box */}
            <Box className="pageContainer" sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' } }}>
                <Card className="sidePanelCard">
                    <Typography className="panelText" variant="h4" gutterBottom component="h4">
                        Your Account
                    </Typography>
                    <Box sx={{ height: '30%', padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <CloudUploadIcon fontSize="large" sx={{ color: '#2196f3' }} />
                            }
                        >

                            <Avatar src={auth.currentUser ? auth.currentUser.photoURL : ""} aria-label="upload picture" onClick={handleClickOpen} sx={{ backgroundColor: 'purple', width: 200, height: 200, fontSize: '80px', cursor: 'pointer' }}>{user.displayName.charAt(0)}</Avatar>

                        </Badge>
                    </Box>

                    <Box
                        sx={{ height: '100%' }}

                    >
                        <Tabs
                            orientation="vertical"
                            // variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            <Tab label="Account Details" {...a11yProps(0)} />
                            <Tab label="Order History" {...a11yProps(1)} />
                            <Tab label="Reservation History" {...a11yProps(2)} />
                            <Tab label="Privacy Policy" {...a11yProps(3)} />
                            <Tab label="Help" {...a11yProps(4)} />
                        </Tabs>

                    </Box>
                </Card>
                <div className="tabPanelContainer">
                    <TabPanel className="tabPanel" value={value} index={0}>
                        <Box className="tabContent">
                            <Accountdetails />
                        </Box>
                    </TabPanel>
                    <TabPanel className="tabPanel" value={value} index={1}>
                        <Box className="tabContent">
                            <Orders />
                        </Box>
                    </TabPanel>
                    <TabPanel className="tabPanel" value={value} index={2}>
                        <Box className="tabContent">
                            <Reservationhistory />
                        </Box>
                    </TabPanel>
                    <TabPanel className="tabPanel" value={value} index={3}>
                        <Box className="tabContent">
                            <Privacypolicy />
                        </Box>
                    </TabPanel>
                    <TabPanel className="tabPanel" value={value} index={4}>
                        <Box className="tabContent">
                            <Help />
                        </Box>
                    </TabPanel>
                </div>
            </Box>

            {/* Mobile View */}

            <Box className="pageContainer" sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none' } }}>

                <div className="tabPanelContainer">
                    <Typography className="panelText" variant="h4" gutterBottom component="h4">
                        Your Account
                    </Typography>
                    <Box sx={{ padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <CloudUploadIcon fontSize="large" sx={{ color: '#2196f3' }} />
                            }
                        >
                            
                            <Avatar src={auth.currentUser ? auth.currentUser.photoURL : ""} aria-label="upload picture" onClick={handleClickOpen} sx={{ backgroundColor: 'purple', width: 150, height: 150, fontSize: '40px', cursor: 'pointer' }}>SR</Avatar>
                            
                        </Badge>
                    </Box>
                    <Tabs
                        orientation="horizontal"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Horizontal tabs"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="Account Details" {...a11yProps(0)} />
                        <Tab label="Order History" {...a11yProps(1)} />
                        <Tab label="Reservation History" {...a11yProps(2)} />

                    </Tabs>

                    <TabPanel className="tabPanel" value={value} index={0}>
                        <Box className="tabContent">
                            <Accountdetails />
                        </Box>
                    </TabPanel>
                    <TabPanel className="tabPanel" value={value} index={1}>
                        <Box className="tabContent">
                            <Orders />
                        </Box>
                    </TabPanel>
                    <TabPanel className="tabPanel" value={value} index={2}>
                        <Box className="tabContent">
                            <Reservationhistory />
                        </Box>
                    </TabPanel>
                    <TabPanel className="tabPanel" value={value} index={3}>
                        <Box className="tabContent">
                            <Privacypolicy />
                        </Box>
                    </TabPanel>
                    <TabPanel className="tabPanel" value={value} index={4}>
                        <Box className="tabContent">
                            <Help />
                        </Box>
                    </TabPanel>
                </div>
            </Box>

        </>

    );
}

export default Account;
