import './DetailViewComponent.css';

const DetailViewComponent = ({product, handleCartAdd}) => {

    return(
        <div className='product-details'>
            <img src={product.image}></img>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>{product.stock} more in stock!</p>
            <p>Category: {product.category}</p>
            <button onClick={() => handleCartAdd()}>Add to basket</button>
        </div>
    );
}

export default DetailViewComponent;