import './CardComponent.css';

const CardComponent = ({props}) => {

    return(
        <div className="cardcomp">
            <img className="cardimg" src={props.image}></img>
            <h3>{props.title}</h3>
            <p>{props.price}</p>
        </div>
    );
}

export default CardComponent;