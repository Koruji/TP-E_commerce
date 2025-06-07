import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "~/contexts/auth/AuthContext";

export default function AdminDeconnexionView() {
    const { isLoggedAdmin, disconnectAdmin } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedAdmin) {
            navigate("/connexion-admin");
        } else {
            disconnectAdmin();
            navigate("/");
        }
    }, [isLoggedAdmin]);

    return (<></>);
}