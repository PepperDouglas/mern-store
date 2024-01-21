import {useState, createContext} from 'react' ;

const StoreContext = createContext();

const ContextProvider = (props) => {
    
    const updateLoggedIn = (val) =>{ setLoggedCustomer(val); }
    const[loggedCustomer, setLoggedCustomer] = useState(0);

    const [userEmail, setUserEmail] = useState("");
    const [userPass, setUserPass] = useState("");

    const [products, setProducts] = useState([]);
    const [searchedValue, setSearchedValue] = useState("");
    

    return (
        <StoreContext.Provider value = {{loggedCustomer, updateLoggedIn, userEmail, setUserEmail, 
        userPass, setUserPass, products, setProducts, searchedValue, setSearchedValue}}>
            {props.children}
        </StoreContext.Provider>
    );
}

export {
    StoreContext,
    ContextProvider
}