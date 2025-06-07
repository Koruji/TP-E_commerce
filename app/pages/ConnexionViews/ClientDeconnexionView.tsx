import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "~/contexts/auth/AuthContext";

export default function ClientDeconnexionView() {
    const { isLogged, deleteUser} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLogged) {
            navigate("/connexion");
        } else {
            deleteUser();
            navigate("/");
        }
    }, [isLogged]);

    return (<></>);
}