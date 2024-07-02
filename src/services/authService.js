import { decodedToken } from "../utils/jwt";
const tokenKey = "accessToken"
export const storeUserInfo = async (token) => {

    if (!tokenKey || typeof window === "undefined") {
        return "";
    }
    return localStorage.setItem(tokenKey, token);
};

export const getUserInfo = () => {
    if (!tokenKey || typeof window === "undefined") {
        return "";
    }
    const authToken = localStorage.getItem(tokenKey);
    if (authToken) {
        const decodedData = decodedToken(authToken);

        return {
            ...decodedData,
            role: decodedData?.role,
        };
    }
};

export const isLoggedIn = () => {
    if (!tokenKey || typeof window === "undefined") {
        return "";
    }
    const authToken = localStorage.getItem(tokenKey);
    if (authToken) {
        return !!authToken;
    }
    return false;
};

export const removeUser = () => {
    if (!tokenKey || typeof window === "undefined") {
        return "";
    }
    return localStorage.removeItem(tokenKey);
};