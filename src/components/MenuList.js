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
                            props.foods.map((food) => {
                            
                                return (

                                    
                                    <Product food={food.data} />
                                    
                                    
                                );
                                
                            })
                            : 
                            props.foods.filter(food => food.data.course === props.filterParam).map((food) => {
                            
                                return (
                                    <Product food={food.data} />
                                );
                                
                            })
                        
                    
                        : 
                        props.foods.filter(food => food.data.name.includes(props.searchQuery)).map((foodSearch) => {
                        
                            return (
                                <Product food={foodSearch.data} />
                            );
                            
                        })
                    
                }
                    
            </>
        );
}
      
  
export default MenuList;