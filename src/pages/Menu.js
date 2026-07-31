import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import MenuList from '../components/MenuList';
import Box from '@mui/material/Box';
import Search from '@mui/icons-material/Search';
import '../css/menu.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Dineinmenu from '../components/DineInMenu';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const chipValues = [
  {
    title: "All",
    id: "All"
  },
  {
    title: "Mains",
    id: "main"
  },
  {
    title: "Appetizers",
    id: "appetizer"
  },
  {
    title: "Cocktails",
    id: "drinks"
  },
  {
    title: "Desserts",
    id: "dessert"
  },
];
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Menu = ({ food, loading }) => {

  const [value, setTabValue] = useState(0);
  const [filterProvider, setFilterParam] = useState('All');
  const [chipColour, setChipColour] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFilterOption = (e) => {
    setFilterParam(e.currentTarget.id);
    setChipColour(true);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="container">
      <Container maxWidth="xl" style={{ marginTop: '32px' }} >
        <Box sx={{ width: '100%', marginTop: '16px' }}>
          <Box>
            <Tabs value={value} onChange={handleChange} aria-label="me4" centered>
              <Tab label="In House Dining" {...a11yProps(0)} />
              <Tab label="Takeout Menu" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <Dineinmenu foods={food} loading={loading}/>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Grid container>
              <Grid size={10} xs={12} sm={9}>
                <Typography gutterBottom variant="h3" component="h2" align="left" className="main-font">
                  Menu
                </Typography>
              </Grid>
              <Grid size={2} xs={12} sm={3}>
                <TextField
                  id="standard-basic"
                  fullWidth
                  label="Search"
                  color="primary"
                  variant="standard"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <Search />
                      </InputAdornment>
                    ),
                    endAdornment: searchQuery && (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClearSearch}
                                size="small"
                                style={{ color: "#999" }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                  }} />
              </Grid>

            </Grid>

            {chipValues.map((chip, index) => (
              <Chip
                key={index}
                style={{ margin: 4 }}
                label={chip.title}
                id={chip.id}
                clickable
                onClick={handleFilterOption}
                color={chipColour && filterProvider === chip.id ? "secondary" : "#010101"}
              />
            ))}

            <Grid container className="centered-container" spacing={2}>
                <MenuList foods={food} loading={loading} filterParam={filterProvider} searchQuery={searchQuery}/>
            </Grid>
          </TabPanel>
        </Box>
      </Container>
    </div>
  )

}

export default Menu;
