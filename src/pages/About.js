import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import '../css/about.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cardRadius:{
    borderRadius: 4,
  },

  gridContent:{
    display: 'flex',
    justifyContent: 'center',

  },
  mainFont:{
    fontFamily: 'Arial'
  },
  card: {
    padding: theme.spacing(1),
  },
}));

const About = () => {

  const classes = useStyles();

    const cardInfo = [
        {image: "img/owner.jpg", name: "Barbara Gordon", position:"Owner, King Triton's Seafood Palace",},
        {image: "img/head-chef.jpg", name: "Sara Lance", position:"Head Chef, King Triton's Seafood Palace",},
        {image: "img/sous-chef.jpg", name: "Lucius Fox", position:"Sous Chef, King Triton's Seafood Palace",},

    ];

    const renderCard = (card, index) => {
        return(

            <Card className="card small" spacing={1} style={{borderRadius: "4px"}} key={index}>
                <CardMedia
                component="img"
                alt={card.position}
                height="200"
                image={card.image}
                title={card.owner}
                className="card-image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="h2" align="center" style={{fontFamily: 'Poiret One', fontWeight: 'bold'}}>
                        {card.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2" align="center">
                        {card.position}
                    </Typography>
                </CardContent>
            </Card>

        )
    };

    return (
        <>
            <Container maxWidth="lg" style={{marginTop: '16px'}}>
                <Typography gutterBottom variant="h3" component="h2" align="left" className={classes.mainFont} >
                    About
                </Typography>
                <Typography variant="body1" gutterBottom style={{lineHeight: 2}}>
                King Triton’s Seafood Palace was founded in 1999.
                King Triton’s gets its name from the 1989 Disney movie, The Little Mermaid, a movie the owner’s son loved as a child.
                Barbara Gordon originally opened her first espresso, doughnut and sandwich shop in 1996 and when that proved to be a fruitful business venture, she expanded and rebranded to what is now known as King Triton’s Seafood Palace.
                It has turned into what is considred by some to the best Seafood Restaurant in Barbados. At King Triton's Seafood Palace Barbados, you can appreciate a wide variety of seafood delights, espresso, drinks, and sandwiches; food fit for a king.
                </Typography>
            </Container>

            <Box
                sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                    gap: 2,
                }}
                >
                {cardInfo.map(renderCard)}
            </Box>
        </>
    );
}

export default About;
