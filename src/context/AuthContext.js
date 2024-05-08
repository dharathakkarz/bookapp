import React, {useState, useEffect,useContext} from "react";
const AuthContext = React.createContext()


export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider(props){
    const [authUser, setAuthUser] = useState(null)
    const [isLoggedIn , setIsLoggedin] = useState(false)

    const value = {
        authUser,
        isLoggedIn,
        setAuthUser,
        setIsLoggedin
    }

    return(
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}