import CardContainer from "../../containers/CardContainer/CardContainer";
import './ProductsComponent.css'


const ProductsComponent = ({data}) => {

    return(
        <div className="products-display">
            {data.map((product, i) => {
                return <CardContainer key={i} prop={product}></CardContainer>
            })}
        </div>
    );
}

export default ProductsComponent;