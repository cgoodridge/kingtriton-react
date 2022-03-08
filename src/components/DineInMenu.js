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
            <Typography
                sx={{ display: 'block' }}
                component="h5"
                variant="h5"
            >
                Appetizers
            </Typography>
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
                        {props.foods.filter(food => food.data.course === 'appetizer').map((food) => {
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
                                            <Avatar alt={food.data.name} src={food.data.image} />
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

                                                    </Typography>
                                                    {food.data.description}
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
            <Typography
                sx={{ display: 'block' }}
                component="h5"
                variant="h5"
            >
                Main Courses
            </Typography>
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
                        {props.foods.filter(food => food.data.course === 'main').map((food) => {
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
                                            <Avatar alt={food.data.name} src={food.data.image} />
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

                                                    </Typography>
                                                    {food.data.description}
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
            <Typography
                sx={{ display: 'block' }}
                component="h5"
                variant="h5"
            >
                Desserts
            </Typography>
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
                        {props.foods.filter(food => food.data.course === 'dessert').map((food) => {
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
                                            <Avatar alt={food.data.name} src={food.data.image} />
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

                                                    </Typography>
                                                    {food.data.description}
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
            <Typography
                sx={{ display: 'block' }}
                component="h5"
                variant="h5"
            >
                Drinks
            </Typography>
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
                        {props.foods.filter(food => food.data.course === 'drinks').map((food) => {
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
                                            <Avatar alt={food.data.name} src={food.data.image} />
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
                                                    
                                                    </Typography>
                                                    {food.data.description}
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
