import './CardComponent.css';

const CardComponent = ({props, setSelected, onclick}) => {

    return(
        <div className="cardcomp" onClick={() => {
            onclick(true);
            setSelected(props.title);
            }}>
            <img className="cardimg" src={props.image}></img>
            <h3>{props.title}</h3>
            <p>${props.price}</p>
        </div>
    );
}

export default CardComponent;