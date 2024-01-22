import CardContainer from "../../containers/CardContainer/CardContainer";


const ProductsComponent = ({data}) => {

    console.log(data)
    return(
        <>
            {data.map((product, i) => {
                return <CardContainer key={i} prop={product}></CardContainer>
            })}
        </>
    );
}

export default ProductsComponent;