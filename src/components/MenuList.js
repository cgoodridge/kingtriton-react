import React from 'react';
import Product from '../components/Product';

import MenuLoadingSkeleton from './MenuLoadingSkeleton';

const MenuList = (props) => {
    
    console.log('props are ', props.loading);
    

    return(
        // TODO: Alter code so it's possible to display all food items on the main menu page, without excluding the special items
        
            <>
                { props.loading ?
                    <MenuLoadingSkeleton/>
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
                        props.foods.filter(food => food.data.name.includes(props.searchQuery)).map((foodSearch, key) => {
                        
                            return (
                                <Product key={key} food={foodSearch.data} />
                            );
                            
                        })
                    
                }
                    
            </>
        );
}
      
  
export default MenuList;