//This is the logic AND parent for the login/out/register buttons
import { useContext } from 'react'
import { StoreContext } from '../../contexts/ContextProvider';
import CustomerComponent from "../../components/CustomerComponent/CustomerComponent";
import LoginContainer from '../LoginContainer/LoginContainer';
import LogoutContainer from '../LogoutContainer/LogoutContainer';
import RegistrerContainer from '../RegistrerContainer/RegistrerContainer';

//It sets the session storage
const CustomerContainer = () => {
    //Here is some context accessors


    const { userEmail, userPass, setUserEmail, setUserPass } = useContext(StoreContext)

    const updateEmail = (e) => {
        const { value } = e.target;
        setUserEmail(value);
    }

    const updatePass = (e) => {
        const { value } = e.target;
        setUserPass(value);
    }


    return(
        <>
            <CustomerComponent testdata={"I am the component"} changeMFn={updateEmail} changePFn={updatePass} mail={userEmail} pass={userPass}></CustomerComponent>
            <LoginContainer></LoginContainer>
            <RegistrerContainer></RegistrerContainer>
            <LogoutContainer></LogoutContainer>
        </>
    )

}

export default CustomerContainer;