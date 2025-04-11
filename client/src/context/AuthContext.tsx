import axios from "axios";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user: {
        email: string
        role: "gamer" | "admin" | "visitor" | "banned"
        userId: string
        username: string
    } | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (username: string, email: string, password: string, motivation: string) => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthContextType["user"]>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    // Vérifier l'utilisateur au chargement
    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/auth/me`, {
                    withCredentials: true,
                });
                setUser(res.data.user);
            } catch (error) {
                console.error("Failed to fetch user:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

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
            navigate("/app");
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
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
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
