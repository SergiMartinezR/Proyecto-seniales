import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

    let [authTokens, setAuthTokens] = useState(null)
    let [user, setUser] = useState(null);

    let loginUser = async (e ) => {
        e.preventDefault();
        console.log('Form submitted')
        // fetch('http://127.0.0.1:8000/login/', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({'username': null, 'password': null})
        // }).then(data => data.json()).then(

        //     data => {
        //         // setTimeout(() => {
        //         //     setIsLoading(false);
        //         // }, 1500);
        //         // console.log(data.token);
        //         // state.token = data.token;
        //     }
        // ).catch(error => console.error(error))
    }

    let contextData = {
        loginUser: loginUser
    }

    return (
        <AuthContext.Provider value={{ 'name': 'Dennis' }}>
            {children}
        </AuthContext.Provider>
    )
}