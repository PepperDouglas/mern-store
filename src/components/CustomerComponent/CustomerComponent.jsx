

const CustomerComponent = (props) => {

    return(
        <>
            {props.testdata}
            <input value={props.mail} onChange={props.changeMFn}></input>
            <input value={props.pass} onChange={props.changePFn}></input>
        </>
    );

}

export default CustomerComponent;