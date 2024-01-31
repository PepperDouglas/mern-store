import axios from 'axios';
import { useEffect, useState, useRef } from 'react'
import CartComponent from '../../components/CartComponent/CartComponent';
import './CartContainer.css'

const CartContainer = () => {

    const [displayItems, setDisplayItems] = useState([]);
    const buyMessage = useRef('');

    useEffect(() => {
        const data = sessionStorage.getItem("topstylecart");
        if (data == null) {
            return;
        }
        const jsonobjs = JSON.parse(data);
        setDisplayItems(jsonobjs);
    }, []);

    const handlePurchase = () => {
        const loggedUser = sessionStorage.getItem("loggedUser");
        if (!loggedUser) {
            buyMessage.current.textContent = 'No user logged in';
            return;
        }
        buyMessage.current.textContent = 'Please wait...';

        let exceededAmounts = false;
        for (var item of displayItems){
            if (item[1] > item[0].stock){
                exceededAmounts = true;
            }
        }

        if (exceededAmounts){
            buyMessage.current.textContent = 'Too few items in stock';
            return;
        }

        let newOrder = [];
        let itemsToReduceStock = [];
        for (var item of displayItems){
            itemsToReduceStock.push(
                { 
                    id: item[0].id,
                    amount: item[1]
                }
            )
            newOrder.push(
                {
                    id: item[0].id,
                    title: item[0].title,
                    price: item[0].price,
                    amount: item[1],
                    total: item[0].price * item[1]
                }
            )
        }
        updateCustomerDbCart(newOrder);

        updateItemDbStock(itemsToReduceStock);

        sessionStorage.removeItem("topstylecart");
        setDisplayItems([]);
    }

    const updateItemDbStock = (newstock) => {
        try {
            axios.patch(`http://localhost:5000/updatestock`, {
                newstock: newstock
            })
            .then((res) => console.log(res.data))

        } catch (error){
            console.error('Error updating stock');
        }
    }

    const updateCustomerDbCart = (newOrder) => {
        const userId = sessionStorage.getItem("loggedUser")
        try {
            axios.patch(`http://localhost:5000/updatecart?customer=${userId}`, {
                newOrder: newOrder
            })
            .then((res) => console.log(res.data))
            .then(buyMessage.current.textContent = 'Thank you for your purchase!')
            .catch((error) => {
                console.error('Error updating cart:', error);
            })
        } catch (error){
            console.error('Error patching order');
        }
    }

    return(
        <div className='cart-unit'>
            <CartComponent data={displayItems}></CartComponent>
            <p>{displayItems.length === 0 ? "No items in cart!" : ""}</p>
            <button style={{display: displayItems.length !== 0 ? "block" : "none"}} onClick={() => handlePurchase()}>Make Purchase</button>
            <p ref={buyMessage}></p>
        </div>
    );
}


export default CartContainer;