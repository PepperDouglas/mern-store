import LogoutComponent from "../../components/LogoutComponent/LogoutComponent";


const LogoutContainer = () => {
    //On logout, navigate to main page? Or reset something? Or not care
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