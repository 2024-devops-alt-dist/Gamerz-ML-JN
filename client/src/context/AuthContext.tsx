import axios from "axios";
import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user: { email: string; role: "gamer" | "admin" } | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (username: string, email: string, password: string, motivation: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthContextType["user"]>(null);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, {
                email,
                password
            },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("login response:", res.data);
            setUser(res.data.user);
            navigate("/app"); // Rediriger après connexion
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = async () => {
        await fetch(`${API_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
        navigate("/");
    };

    const register = async (username: string, email: string, password: string, motivation: string) => {
        try {
            const res = await axios.post(`${API_URL}/api/auth/register`, {
                username,
                email,
                password,
                motivation
            },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("register response:", res.data);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
