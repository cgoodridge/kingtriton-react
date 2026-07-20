import React, { useState } from 'react';
import '../css/account.css';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Orders from './Orders';
import EditProfile from './EditProfile';
import Privacypolicy from './PrivacyPolicy';
import Help from './Help';
import Reservationhistory from './ReservationHistory';
import { styled } from '@mui/material/styles';

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

    const [value, setValue] = useState(0);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box className="pageContainer" sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' } }}>
                <Card className="sidePanelCard">
                    <Typography className="panelText" variant="h4" gutterBottom component="h4">
                        Your Account
                    </Typography>
                    <Box sx={{ height: '100%' }}>
                        <Tabs
                            orientation="vertical"
                            // variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            <Tab label="Edit Profile" {...a11yProps(0)} />
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
                            <EditProfile />
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
                            <EditProfile />
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
