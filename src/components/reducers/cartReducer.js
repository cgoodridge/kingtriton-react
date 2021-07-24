import { ADD_TO_CART, REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY} from '../actions/action-types/cart-actions';

const initState = {
    items: [
        {
            id: 1,
            name: "Shrimp Alfredo",
            price: 16,
            image: "img/mains/shrimpalfredo.jpg",
            course: "main",
            quantity: 1,
            special: true

        },
        {
            id: 2,
            name: "Lobster Mac & Cheese",
            price: 22,
            image: "./img/mains/lobster-mac.jpg",
            course: "main",
            quantity: 1,
            special: true

        },
        {
            id: 3,
            name: "Fried Calamari",
            price: 16,
            image: "img/mains/fried-calamari.jpeg",
            course: "appetizer",
            quantity: 1,
            special: true
        },
        {
            id: 4,
            name: "Fideua",
            price: 20,
            image: "img/mains/fideua.png",
            course: "main",
            quantity: 1,
            special: true
        },
        {
            id: 5,
            name: "Coconut Ceviche",
            price: 22,
            image: "img/starters/cc.jpg",
            course: "appetizer",
            quantity: 1,
            special: false
        },
        {
            id: 6,
            name: "Fish Taco",
            price: 18,
            image: "img/starters/fishtaco.jpg",
            course: "appetizer",
            quantity: 1,
            special: false


        },
        {
            id: 7,
            name: "Lobster Risotto",
            price: 24,
            image: "img/starters/lobsterRisotto.jpg",
            course: "main",
            quantity: 1,
            special: false

        },
        {
            id: 8,
            name: "Banana Pudding",
            price: 14,
            image: "img/desserts/bPudding.jpg",
            course: "dessert",
            quantity: 1,
            special: false

        }

    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
    
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
}
export default cartReducer;