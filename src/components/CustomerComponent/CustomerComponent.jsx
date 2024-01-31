

const CustomerComponent = (props) => {

    return(
        <div className="customer-component">
            <input placeholder="Email" type="text" value={props.mail} onChange={props.changeMFn}></input>
            <input placeholder="Password" type="password" value={props.pass} onChange={props.changePFn}></input>
        </div>
    );

}

export default CustomerComponent;