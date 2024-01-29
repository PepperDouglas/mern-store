import { useContext } from "react";
import axios from 'axios';
import { StoreContext } from "../../contexts/ContextProvider";
import LoginComponent from "../../components/LoginComponent/LoginComponent";


const LoginContainer = () => {

    const { userEmail, userPass, setUserEmail, setUserPass, updateLoggedIn } = useContext(StoreContext)


    const handleLoginClick = () => {
        //alert("Email: " + userEmail);
        //alert("Password: " + userPass);
        axios.get(`http://localhost:5000/login?email=${userEmail}`)
        .then((response) => {
        console.log('Received customer response:', response.data);
        if(userPass === response.data.password){
            sessionStorage.setItem("loggedUser", response.data._id);
            //updateLoggedIn(response.data._id);
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