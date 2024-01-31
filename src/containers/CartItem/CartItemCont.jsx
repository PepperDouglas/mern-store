import CartItemComp from "../../components/CartItem/CartItemComp";

const CartItemCont = ({prop}) => {
    return(
        <>
            <CartItemComp data={prop}></CartItemComp>
        </>
    );
}


export default CartItemCont;