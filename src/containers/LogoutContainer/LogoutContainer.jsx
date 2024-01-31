import LogoutComponent from "../../components/LogoutComponent/LogoutComponent";


const LogoutContainer = () => {
    const logout = () => {
        sessionStorage.removeItem("loggedUser");
    }

    return(
        <>
            <LogoutComponent logoutFn={logout}></LogoutComponent>
        </>
    )

}

export default LogoutContainer;