import { useContext } from "react";
import axios from 'axios';
import { StoreContext } from "../../contexts/ContextProvider";
import RegistrerComponent from "../../components/RegistrerComponent/RegistrerComponent";


const RegistrerContainer = () => {


    const { userEmail, userPass, setUserEmail, setUserPass } = useContext(StoreContext)

    const handleRegistrer = () => {
        console.log("Registrer start");
        axios.get(`http://localhost:5000/doescustomerexist?email=${userEmail}`)
            .then((response) => {
            console.log('RESPONSE:', response);
            if(response.data === null){
                axios.post(`http://localhost:5000/registrer?email=${userEmail}&password=${userPass}`)
                .then((res) => {
                    console.log("New user made with res: " + res);
                })


            }    
        
        })
        .catch((error) => {
            console.error('Error fetching customer:', error);
        });

    }

    return(
        <>
            <RegistrerComponent handleRegistrer={handleRegistrer}></RegistrerComponent>
        </>
    );

}

export default RegistrerContainer;