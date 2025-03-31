import { createContext, useContext, useEffect, useState } from "react";
import AuthContextType from "../types/auth/AuthContextType";
import AuthProviderPropsType from "../types/auth/AuthProviderPropsType";

export const AuthContext = createContext<AuthContextType>({
    userName: null,
    isAuthenticated: false,
    jwtToken: null,
    loading: true,
    login: () => { },
    logout: () => { }
})

export function AuthProvider({ children }: AuthProviderPropsType) {
    const [userName, setName] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [jwtToken, setJwtToken] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    function login(jwtToken: string) {
        setName(jwtToken)
        setIsAuthenticated(true)
        setJwtToken(jwtToken)
        localStorage.setItem("token", jwtToken)
    }

    function logout() {
        setIsAuthenticated(false)
        setJwtToken(null)
        localStorage.removeItem("token")
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token != null) {
            setIsAuthenticated(true)
            setJwtToken(token)
            setLoading(false)
        }else{
            setLoading(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ userName, isAuthenticated,jwtToken, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)