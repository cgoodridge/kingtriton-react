import React from 'react';
import Product from '../components/Product';

const MenuList = (props) => {
    
    console.log('filter param is', props.filterParam);
    

    return(
        // TODO: Alter code so it's possible to display all food items on the main menu page, without excluding the special items
        
            <>
                {
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
                    
                    
                    
                }
                    
            </>
        );
}
      
  
export default MenuList;