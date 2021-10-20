import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const Dineinmenu = (props) => {
    return (
        <>
            {
                props.loading ?
                    <>
                        <Box sx={{ width: '100%', marginBottom: '16px' }}>
                            <Skeleton />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </Box>
                        <Box sx={{ width: '100%', marginBottom: '16px' }}>
                            <Skeleton />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </Box>
                        <Box sx={{ width: '100%', marginBottom: '16px' }}>
                            <Skeleton />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </Box>
                        <Box sx={{ width: '100%', marginBottom: '16px' }}>
                            <Skeleton />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </Box>
                        <Box sx={{ width: '100%', marginBottom: '16px' }}>
                            <Skeleton />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </Box>
                    </>
                    :

                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {props.foods.map((food) => {
                            return (
                                <>
                                    <ListItem
                                        alignItems="flex-start"
                                        secondaryAction={
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="strong"
                                                variant="body2"
                                                color="text.primary"
                                                edge="end"
                                            >
                                                {'$' + food.data.price}
                                            </Typography>
                                        }>
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={food.data.image} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={food.data.name}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        Description
                                                    </Typography>
                                                    {' — ' + food.data.description}
                                                </React.Fragment>
                                            }
                                        />

                                    </ListItem>

                                    <Divider variant="inset" component="div" />
                                </>
                            );
                        })}
                    </List>
            }
        </>

    );
}

export default Dineinmenu;
