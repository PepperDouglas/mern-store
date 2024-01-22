import './CardComponent.css';

const CardComponent = ({props, setSelected, id}) => {

    //setSelected should be from _id or something, not title!
    return(
        <div className="cardcomp" onClick={() => setSelected(props.title)}>
            <img className="cardimg" src={props.image}></img>
            <h3>{props.title}</h3>
            <p>{props.price}</p>
        </div>
    );
}

export default CardComponent;