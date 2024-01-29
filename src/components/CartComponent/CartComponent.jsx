import CartItemCont from "../../containers/CartItem/CartItemCont";

const CartComponent = ({data}) => {

    console.log(data)
    return(
        <>
            {data.map((product, i) => {
                return <CartItemCont key={i} prop={product}></CartItemCont>
            })}
        </>
    );
}

export default CartComponent;