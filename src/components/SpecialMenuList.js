import React from 'react';
import Product from '../components/Product';
import MenuLoadingSkeleton from './MenuLoadingSkeleton';


const SpecialMenuList = (props) => {
    
    // console.log('Food props are ', props.foods);
    
    

    return(
        // TODO: Alter code so it's possible to display all food items on the main menu page, without excluding the special items
        
            <>
                {
                    props.loading ?
                    <MenuLoadingSkeleton/>
                    :
                    props.foods.filter(food => food.data.special === true).map((filteredFood) => {
                        return (
                            <Product food={filteredFood.data} />
                        );
                    })
                }
                    
            </>
        );
}
      
  
export default SpecialMenuList;