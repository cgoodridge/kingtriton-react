import React from "react";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Data = () => {

    const cardInfo = [
        {image: "", name: "Shrimp Alfredo", price:16,},
        {image: "", name: "Lobster Mac & Cheese", price:22,},
        {image: "", name: "Fried Calamari", price:16,},
    ];

    const renderCard = (card, index) => {
        return(
            <Card className="" key={index}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                    Share
                    </Button>
                    <Button size="small" color="primary">
                    Learn More
                    </Button>
                </CardActions>
            </Card>
        )
    };


    return (
        <div className="App">
             {cardInfo.map(renderCard)}
        </div>
    )    

};

export default Data;