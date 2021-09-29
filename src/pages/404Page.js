import React from 'react';
import '../css/notFound.css';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="notFoundContent">
            <lottie-player src="https://assets5.lottiefiles.com/private_files/lf30_ew2u6eqa.json"  background="transparent"  speed="1"  style={{width: '300', height: '300px'}}  loop autoplay></lottie-player>
            {/* <h1 className="code">404</h1> */}
            <h3>Whoops, looks like you got lost there.</h3>
            <h4>How about we go grab some food?</h4>
            <Button size="large" variant="contained" color="secondary" component={Link} to="/menu">Food!</Button>
        </div>
    );
}

export default PageNotFound;
