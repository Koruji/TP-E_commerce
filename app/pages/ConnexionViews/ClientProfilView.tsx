import { useNavigate } from "react-router";

export default function ClientProfilView() {
    const sessionStorageD = sessionStorage.getItem("client");
    const connectUser = sessionStorageD ? JSON.parse(sessionStorageD) : null;
    const navigate = useNavigate();

    return (<>
        {!connectUser && (
            <h3 className="text-center">Aucun utilisateur de connecté !</h3>
        )}

        {connectUser && (
            <section>
                <h3 className="text-center">Vous êtes connecté : {connectUser.username}</h3>
                <div className="m-4">
                    <p>Avec le mot de passe : <strong>{connectUser.password}</strong></p>
                    <p>Et le token suivant : <strong>{connectUser.token}</strong></p>
                </div>
                <button className="btn" onClick={() => navigate("/")}>Retour au menu</button>
            </section>
        )}
        
    </>);
}