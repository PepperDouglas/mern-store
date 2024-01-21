import CardComponent from "../../components/CardComponent/CardComponent";



const CardContainer = ({prop}) => {

    //Card logic
    console.log("hello" + prop);
    return(
        
        <CardComponent props={prop}></CardComponent>
        
    );
}

export default CardContainer;