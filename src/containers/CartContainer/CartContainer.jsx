import axios from 'axios';
import { useContext, useEffect, useState, useRef } from 'react'
import { StoreContext } from '../../contexts/ContextProvider';
import CartComponent from '../../components/CartComponent/CartComponent';

const CartContainer = () => {

    const { loggedCustomer, setLoggedCustomer } = useContext(StoreContext);
    const [displayItems, setDisplayItems] = useState([]);
    const buyMessage = useRef('');

    useEffect(() => {
        //get localstorage
        const data = sessionStorage.getItem("topstylecart");
        if (data == null) {
            return;
        }
        const jsonobjs = JSON.parse(data);
        setDisplayItems(jsonobjs);
    }, []);

    const handlePurchase = () => {
        //check if valid amount (first by internal data, then by fetch)
        //---if we have time!

        //Now just get logged user

        //If none, set message
        const loggedUser = sessionStorage.getItem("loggedUser");
        if (!loggedUser) {
            buyMessage.current.textContent = 'No user logged in';
            return;
        }
        buyMessage.current.textContent = 'Please wait...';
        //See the amounts
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
        //create the data we want to put, to be able to send it as a new order:
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
        //call on func to update customer with items (send customer _id or something)
        updateCustomerDbCart(newOrder);

        //call on func to remove stock for each item (send array with id's or something)
        updateItemDbStock(itemsToReduceStock);
    }

    const updateItemDbStock = (newstock) => {
        console.log("client enter stock");
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
        //console.log(sessionStorage.getItem("loggedUser"));
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
        <>
            <CartComponent data={displayItems}></CartComponent>
            <button onClick={() => handlePurchase()}>Make Purchase</button>
            <p ref={buyMessage}></p>
        </>
    );
}


export default CartContainer;