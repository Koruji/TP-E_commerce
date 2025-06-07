import { createContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import type { UserI } from "~/models/Authentication/auth.interface";

interface AuthContextI {
    error: string,
    users: UserI[],
    isLogged: boolean,
    isLoggedAdmin: boolean,
    fetchAllUsers: () => Promise<void>,
    connectToAPI: (user: {username: string, password: string}) => Promise<void>,
    handleConnexion: (state: boolean) => void,
    deleteUser: () => void,
    createAdmin: (admin: {username: string, password: string}) => void,
    disconnectAdmin: () =>void
}

export const AuthContext = createContext<AuthContextI>(null!);

export const AuthProvider = ({children}: {children: ReactNode}) => {

    const [error, setError] = useState<string>("");
    const [users, setUsers] = useState<UserI[]>([]);
    const [isLogged, setIsLogged] = useState(false);
    const [isLoggedAdmin, setIsLoggedAdmin] = useState(false);
    const [readSessionInfos, setReadSessionInfos] = useState(true);
    const [user, setUser] = useState<UserI>({} as UserI);
    const [admin, setAdmin] = useState<{ username: string, password: string }>({username: '', password: ''});
    const navigate = useNavigate();

    const fetchAllUsers = async () => {
        await fetch("https://fakestoreapi.com/users")
        .then(response => response.ok && response.json())
        .then(datas => setUsers(datas))
        .catch(err => setError(`Une erreur est survenue : ${err}`));
    }

    const connectToAPI = async (user: {username: string, password: string}) => {
        try {
            const response = await fetch("https://fakestoreapi.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: user.username,
                    password: user.password
                })
            });

            if(!response.ok) {
                throw new Error(`Mauvais identifiants`);
            } 
            
            const data = await response.json();
            sessionStorage.setItem("client", JSON.stringify({
                username: user.username, 
                password: user.password, 
                token: data.token
            }));
            handleConnexion(true);
            navigate("/success-log");

        } catch (err)  {
                setError(`Une erreur est survenue : ${err}`);
                handleConnexion(false);
                deleteUser();
        }
    }

    // deconnexion client
    const deleteUser = () => {
        if(sessionStorage.getItem("client")) {
            sessionStorage.removeItem("client");
            handleConnexion(false);
        }
    }

    //verification de connexion 
    const handleConnexion = (state: boolean) => {
        setIsLogged(state);
    };    

    //recuperation de l'user sur toutes les pages
    const getUserSession = () => {
        const userSession = sessionStorage.getItem("client")
        return userSession ? JSON.parse(userSession) : undefined;
    }

    useEffect(() => {
        if(readSessionInfos){
            const savedUser = getUserSession();
            if(savedUser){
                setUser(savedUser);
                handleConnexion(true);
            }
        }
    }, [readSessionInfos]);

    //partie administrateur
    const createAdmin = (admin: {username: string, password: string}) => {
        if(!sessionStorage.getItem("admin")) {
            sessionStorage.setItem("admin", JSON.stringify({username: admin.username, password: admin.password}));
            handleConnexionAdmin(true);
        }
    }

    const getAdminSession = () => {
        const adminSession = sessionStorage.getItem("admin")
        return adminSession ? JSON.parse(adminSession) : undefined;
    }

    const disconnectAdmin = () => {
        if(sessionStorage.getItem("admin")) {
            sessionStorage.removeItem("admin");
            handleConnexionAdmin(false);
        }
    }

    const handleConnexionAdmin = (state: boolean) => {
        setIsLoggedAdmin(state);
    }; 

    useEffect(() => {
        if(readSessionInfos){
            const savedAdmin = getAdminSession();
            if(savedAdmin){
                setAdmin(savedAdmin);
                handleConnexionAdmin(true);
            }
        }
    }, [readSessionInfos]);

    return(
        <AuthContext.Provider value={{
            error,
            users,
            isLogged,
            isLoggedAdmin,
            connectToAPI,
            handleConnexion,
            deleteUser,
            fetchAllUsers,
            createAdmin,
            disconnectAdmin
        }}>
            {children}
        </AuthContext.Provider>
    )
}