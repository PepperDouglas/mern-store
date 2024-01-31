//This is the logic AND parent for the login/out/register buttons
import { useContext } from 'react'
import { StoreContext } from '../../contexts/ContextProvider';
import CustomerComponent from "../../components/CustomerComponent/CustomerComponent";
import LoginContainer from '../LoginContainer/LoginContainer';
import LogoutContainer from '../LogoutContainer/LogoutContainer';
import RegistrerContainer from '../RegistrerContainer/RegistrerContainer';
import './CustomerContainer.css';

const CustomerContainer = () => {

    const { userEmail, userPass, setUserEmail, setUserPass, setCartOpen } = useContext(StoreContext)

    const updateEmail = (e) => {
        const { value } = e.target;
        setUserEmail(value);
    }

    const updatePass = (e) => {
        const { value } = e.target;
        setUserPass(value);
    }

    const openCart = () => {
        setCartOpen(false);
    }


    return(
        <div className='customer-controls'>
            <CustomerComponent changeMFn={updateEmail} changePFn={updatePass} mail={userEmail} pass={userPass}></CustomerComponent>
            <div>
                <LoginContainer></LoginContainer>
                <RegistrerContainer></RegistrerContainer>
                <LogoutContainer></LogoutContainer>
                <button onClick={openCart}>CART</button>
            </div>
        </div>
    )

}

export default CustomerContainer;