import { useContext } from "react";
import { StoreContext } from "../../contexts/ContextProvider";
import CardComponent from "../../components/CardComponent/CardComponent";



const CardContainer = ({prop, key}) => {

    //Card logic
    const { setSelectedProduct } = useContext(StoreContext);

    console.log("hello" + prop.title);
    return(
        
        <CardComponent id={key} props={prop} setSelected={setSelectedProduct}></CardComponent>
        
    );
}

export default CardContainer;