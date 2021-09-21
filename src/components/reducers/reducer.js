import { ADD_TO_CART, REMOVE_FROM_CART,SUB_QUANTITY,ADD_QUANTITY} from '../actions/cart-actions';

export const initialState = {
    cart: [],
    addedItems:[],
    total: 0
};

export const getCartTotal = (cart) => cart?.reduce((amount, food) => food.price + amount, 0);


const reducer = (state = initialState, action) => {
    console.log(action);
    if (action.type === ADD_TO_CART) {
        /// TODO: Update quantity when the same item is added multiple times
        return {
            ...state,
            cart: [...state.cart, action.item]
        };
    }
    
    if (action.type === REMOVE_FROM_CART) {
        const index = state.cart.findIndex(
            (cartItem) => cartItem.id === action.id
        );
        let newCart = [...state.cart];

        if (index >= 0) {
            newCart.splice(index, 1)
        } else {
            console.warn(`Can't remove item with id: ${action.id}, it is not in the cart.`)
        }

        return {
            ...state,
            cart: newCart
        }
    }

    /*
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
        let addedItem = state.items.find(item=> item.id === action.id)
        //check if the action id exists in the addedItems
        let existed_item= state.addedItems.find(item=> action.id === item.id)
       if(existed_item)
       {
          addedItem.quantity += 1 
           return{
              ...state,
               total: state.total + addedItem.price 
                }
      }
       else{
          addedItem.quantity = 1;
          //calculating the total
          let newTotal = state.total + addedItem.price 
          
          return{
              ...state,
              addedItems: [...state.addedItems, addedItem],
              total : newTotal
          }
          
      }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
            addedItem.quantity += 1 
            let newTotal = state.total + addedItem.price
            return{
                ...state,
                total: newTotal
            }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }
    return state
    */
}
export default reducer;