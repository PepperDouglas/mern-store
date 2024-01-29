

const CartItemComp = ({data}) => {

    
    return(
        <>
            I am the cart item displays
            <p>{data[0].title}</p>
            <p>Amount: {data[1]} / {data[0].stock}</p>
        </>
    );
}

export default CartItemComp;