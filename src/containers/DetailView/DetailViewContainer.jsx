import { useRef, useContext, useEffect, useState } from "react";
import { StoreContext } from "../../contexts/ContextProvider";
import DetailViewComponent from "../../components/DetailView/DetailViewComponent";


const DetailViewContainer = () => {

    const { selectedProduct, products } = useContext(StoreContext);
    const [relevantProduct, setRelevantProduct] = useState([]);

    const firstMount = useRef(true);

    useEffect(() => {

        if(firstMount.current){
            firstMount.current = false;
            return;
        }
        //find by id here? should not be title, should be _id
        setRelevantProduct(products.find(product => product.title === selectedProduct));

    }, [selectedProduct]);

    const addToCart = () => {
        //add to sessionStorage. It is not needed, and makes it more complex
        //but it is more accurate and good practice
        //1. Get the product details object. 
        const productToAdd = relevantProduct;
        //2. Check if exists then increase counter or, create item
        const cartInStorage = sessionStorage.getItem("topstylecart");
        if(cartInStorage === null){
            let storageArr = [];
            storageArr.push([productToAdd, 1]);
            sessionStorage.setItem("topstylecart", JSON.stringify(storageArr));
        } else {
            //find if item exists here
            let storageArr = JSON.parse(sessionStorage.getItem("topstylecart"));
            const itemPos = storageArr.findIndex(([item]) => item.title === productToAdd.title);
            if (itemPos === -1){
                storageArr.push([productToAdd, 1]);
                sessionStorage.setItem("topstylecart", JSON.stringify(storageArr));
            } else {
                storageArr[itemPos][1] += 1;
                sessionStorage.setItem("topstylecart", JSON.stringify(storageArr));
            }
        }


    }


    return(
        <>
            <DetailViewComponent product={relevantProduct} handleCartAdd={addToCart}></DetailViewComponent>
        </>
    );
}

export default DetailViewContainer;