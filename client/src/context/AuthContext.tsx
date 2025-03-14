import axios from "axios";
import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user: { email: string; role: "gamer" | "admin" } | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthContextType["user"]>(null);
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', {
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
        await fetch("http://localhost:3000/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
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
