import './CartItem.css'

const CartItemComp = ({data}) => {

    return(
        <div className="user-cart-item">
            <h3>{data[0].title}</h3>
            <p>Amount: {data[1]} / {data[0].stock}</p>
        </div>
    );
}

export default CartItemComp;