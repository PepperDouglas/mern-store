import CartItemComp from "../../components/CartItem/CartItemComp";


//I am living in the CartComponent
const CartItemCont = ({prop}) => {
    console.log(prop);
    //Here is logic for the add and remove item buttons for example
    //Also amount of item available data (unless we do a seperate fetch! (which is important for multi-user applications, like a web store))


    return(
        <>
            <CartItemComp data={prop}></CartItemComp>
        </>
    );
}


export default CartItemCont;