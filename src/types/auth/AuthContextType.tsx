interface AuthContextType {
    userName: any,
    isAuthenticated: boolean,
    jwtToken: string | null,
    loading: boolean,
    login: (jwtToken: string) => void,
    logout: () => void
}

export default AuthContextType