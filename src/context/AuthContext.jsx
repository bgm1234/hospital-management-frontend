import React , { useCallback, useContext, useMemo , useState} from "react";
const AuthContext = React.createContext([]);

export const AuthContextProvider = ({ children }) => {
const [authData, setAuthData] = useState(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    return { token, user };
});
const login = useCallback((token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user)); // Kullanıcı bilgilerini JSON string olarak kaydediyoruz
    setAuthData({ token, user });
}, [setAuthData])
console.log(authData);
const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthData({ token: null, user: null });
},[setAuthData]);
const value = useMemo(() => ({
    authData,
    login,
    logout
}), [login,authData])


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuthContext = () => useContext(AuthContext);