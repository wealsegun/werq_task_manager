import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import api, { setAuthToken } from "../utils/api";

interface AuthContextProps {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (
        firstName: string,
        lastName: string,
        gender: string,
        phoneNumber: string,
        email: string,
        password: string,
        role: string
    ) => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
    const router = useRouter();

    const login = async (email: string, password: string) => {
        const { data } = await api.post("/accounts/login", { email, password });
        setUser(data.user);
        setAuthToken(data.token);
        localStorage.setItem("token", data.token);
        router.push("/tasks");
    };

    const register = async (firstName: string, lastName: string, gender: string, phoneNumber: string, email: string, password: string, role: string) => {
        await api.post("/accounts/register", { firstName, lastName, gender, phoneNumber, email, password, role });
        router.push("/login");
    };

    const logout = () => {
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem("token");
        router.push("/login");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setAuthToken(token);
            api.get("/accounts/me")
                .then((response) => setUser(response.data))
                .catch(() => logout());
        }
    }, []);

    const isAuthenticated = !!user;

    return (

        <AuthContext.Provider value= {{ user, login, logout, register, isAuthenticated }
}>
    { children }
    </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};