import React from 'react';
import Product from '../components/Product';

import MenuLoadingSkeleton from './MenuLoadingSkeleton';

const MenuList = (props) => {



    return (
        // TODO: Alter code so it's possible to display all food items on the main menu page, without excluding the special items

        <>
            {props.loading ?
                <MenuLoadingSkeleton />
                :
                props.searchQuery === '' ?

                    props.filterParam === 'All' ?
                        props.foods.map((food, key) => {

                            return (


                                <Product key={key} food={food.data} />


                            );

                        })
                        :
                        props.foods.filter(food => food.data.course === props.filterParam).map((food, key) => {

                            return (
                                <Product key={key} food={food.data} />
                            );

                        })


                    :
                    props.foods.filter(food => food.data.name.toLowerCase().includes(props.searchQuery.toLowerCase())).map((foodSearch, key) => {
                        return (

                        //  <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_dzkmo4nk.json" background="transparent" speed="1" style={{ width: '300px', height: '300px' }} loop autoplay></lottie-player> :
                                <Product key={key} food={foodSearch.data} />




                        );

                    })

            }

        </>
    );
}


export default MenuList;