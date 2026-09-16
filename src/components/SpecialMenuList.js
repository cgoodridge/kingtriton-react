import React from 'react';
import Grid from '@mui/material/Grid';
import Product from '../components/Product';
import MenuLoadingSkeleton from './MenuLoadingSkeleton';

const SpecialMenuList = (props) => {

    return(
        // TODO: Alter code so it's possible to display all food items on the main menu page, without excluding the special items

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    props.loading ?
                    <MenuLoadingSkeleton/>
                    :
                    props.foods.filter(food => food.data.special === true).map((filteredFood, key) => {
                        return (
                            <Product key={key} food={filteredFood.data} />
                        );
                    })
                }
            </Grid>
        );
}


export default SpecialMenuList;