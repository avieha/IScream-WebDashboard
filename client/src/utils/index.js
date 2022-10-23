const TOKEN_KEY = 'jwt';
/**
 * For local Storage param
 * @param token
 * @param mail
 */
export const login = (token,id) => {
    // localStorage.setItem(TOKEN_KEY, token);
    // localStorage.setItem('id',id);
    return "LOGIN_SUCCESS"
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('id')
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false;
}

export const getNumOfTrades = ()=>{
    return localStorage.getItem('id');
}