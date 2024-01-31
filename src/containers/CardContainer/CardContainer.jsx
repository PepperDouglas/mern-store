import { useContext } from "react";
import { StoreContext } from "../../contexts/ContextProvider";
import CardComponent from "../../components/CardComponent/CardComponent";



const CardContainer = ({prop}) => {

    const { setSelectedProduct, setCartOpen } = useContext(StoreContext);

    return(
        
        <CardComponent props={prop} onclick={setCartOpen} setSelected={setSelectedProduct}></CardComponent>
        
    );
}

export default CardContainer;