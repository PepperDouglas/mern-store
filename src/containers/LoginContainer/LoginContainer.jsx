import { useContext } from "react";
import axios from 'axios';
import { StoreContext } from "../../contexts/ContextProvider";
import LoginComponent from "../../components/LoginComponent/LoginComponent";


const LoginContainer = () => {

    const { userEmail, userPass, setUserEmail, setUserPass } = useContext(StoreContext)


    const handleLoginClick = () => {
        axios.get(`http://localhost:5000/login?email=${userEmail}`)
        .then((response) => {
        console.log('Received customer response:', response.data);
        if(userPass === response.data.password){
            sessionStorage.setItem("loggedUser", response.data._id);
            setUserEmail("");
            setUserPass("");
        }
        })
        .catch((error) => {
            console.error('Error fetching customer:', error);
        });
    }

    return(
        <>
            <LoginComponent handleClick={handleLoginClick}></LoginComponent>
        </>
    )
}

export default LoginContainer;