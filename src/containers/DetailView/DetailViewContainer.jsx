import { useRef, useContext, useEffect, useState } from "react";
import { StoreContext } from "../../contexts/ContextProvider";
import DetailViewComponent from "../../components/DetailView/DetailViewComponent";
import './DetailView.css';

const DetailViewContainer = () => {

    const { selectedProduct, products } = useContext(StoreContext);
    const [relevantProduct, setRelevantProduct] = useState([]);

    const firstMount = useRef(true);

    useEffect(() => {

        if(firstMount.current){
            firstMount.current = false;
            return;
        }
        setRelevantProduct(products.find(product => product.title === selectedProduct));
        
    }, [selectedProduct]);
    
    useEffect(() => {
        if(selectedProduct.length == 0){
            return;
        }
        setRelevantProduct(products.find(product => product.title === selectedProduct));
    }, [])

    const addToCart = () => {
        const productToAdd = relevantProduct;
        const cartInStorage = sessionStorage.getItem("topstylecart");

        if(cartInStorage === null){
            let storageArr = [];
            storageArr.push([productToAdd, 1]);
            sessionStorage.setItem("topstylecart", JSON.stringify(storageArr));
        } else {
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
        <div className="detail-div">
            {selectedProduct.length == 0 ? <p></p> : <DetailViewComponent product={relevantProduct} handleCartAdd={addToCart}></DetailViewComponent>}
        </div>
    );
}

export default DetailViewContainer;