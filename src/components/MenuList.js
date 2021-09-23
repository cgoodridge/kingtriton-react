import React from 'react';
import Product from '../components/Product';

const MenuList = (props) => {

    return(
        // TODO: Alter code so it's possible to display all food items on the main menu page, without excluding the special items
        
            <>
                {props.foods.map((food) => {
                    return (
                        <Product food={food} />
                    );
                    
                })}
                    
            </>
        );
}
      
  
export default MenuList;