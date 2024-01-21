import CardContainer from "../../containers/CardContainer/CardContainer";


const ProductsComponent = ({data}) => {

    console.log(data)
    return(
        <>
            {data.map((product) => {
                return <CardContainer key={product.id} prop={product}></CardContainer>
            })}
        </>
    );
}

export default ProductsComponent;