import React from 'react';
import Grid from '@mui/material/Grid';
import '../css/footer.css';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
    return (
        <footer>
          <Grid container alignItems="center" justifyContent="center" className="grid-content">
              <Grid item alignItems="stretch" xs={12} md={6} lg={3}>
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
                <p>Mon - Sat: 11AM - 10PM |
                Sunday: Closed</p>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <Typography variant="h5" gutterBottom component="div" className="footerHeaders">
                  Location
                </Typography>
                <p>Hastings Main Road, Christ Church</p>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <Typography variant="h5" gutterBottom component="div" className="footerHeaders">
                  Follow Us
                </Typography>
                <div className="row center-align" style={{padding: "8px"}}>
                <IconButton style={{ padding: '8px', color: 'white' }}>
                    <InstagramIcon />
                </IconButton>
                <IconButton style={{ padding: '8px', color: 'white' }}>
                    <XIcon />
                </IconButton>
                <IconButton style={{ padding: '8px', color: 'white' }}>
                    <FacebookIcon />
                </IconButton>
                </div>
              </Grid>
          </Grid>
          <Typography variant="subtitle1" component="div" className="footer-copyright">
            © 2026 King Triton's Seafood Palace
          </Typography>
        </footer>
    );
}

export default Footer;
