import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import '../css/footer.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

const Footer = () => {
    return (
        <footer>
          <Grid container alignItems="center" justify="center" className="grid-content">
              <Grid item xs={12} md={6} lg={3}>
                <img id="footer-logo" src="./img/temp-logo.png" alt="Site Logo"></img>
                <Typography variant="h5" gutterBottom component="div" className="footerHeaders">
                  King Triton's Seafood Palace
                </Typography>
                <p>(246)439-9000</p>
                <p>info@triton.com</p>
              </Grid>
  
              <Grid item xs={12} md={6} lg={3}>
                <Typography variant="h5" gutterBottom component="div" className="footerHeaders">
                  Opening Hours
                </Typography>
                <p>Mon - Sat: 11AM - 4PM</p>
                <p>Sunday: Closed</p>
              </Grid>
  
              <Grid item xs={12} md={6} lg={3}>
                <Typography variant="h5" gutterBottom component="div" className="footerHeaders">
                  Location
                </Typography>
                <p>Hastings Main Road Ch Ch</p>
              </Grid>
  
              <Grid item xs={12} md={6} lg={3}>
                <Typography variant="h5" gutterBottom component="div" className="footerHeaders">
                  Follow Us
                </Typography>
                <div className="row center-align" style={{padding: "8px"}}>
                  <IconButton style={{padding: "8px", color:'white'}}>
                    <i className="devicon-twitter-original"></i>
                  </IconButton>
                  <IconButton style={{padding: "8px", color:'white'}}>
                    <i className="devicon-facebook-original"></i>
                  </IconButton>
                </div>
              </Grid>
  
          </Grid>
  
          <Typography variant="subtitle1" gutterBottom component="div" className="footer-copyright">
            © 2021 King Triton's Seafood Palace
          </Typography>      
        </footer>
    );
}

export default Footer;
