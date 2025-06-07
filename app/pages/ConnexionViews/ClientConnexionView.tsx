import { useContext, useEffect, useState } from "react";
import { AuthContext } from "~/contexts/auth/AuthContext";
import "./ClientConnexionView.css";

export default function ClientConnexionView() {

    const {connectToAPI, fetchAllUsers, users, isLogged, error} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [showPasword, setShowPassword] = useState(false);

    const handleSubmit = (formData: FormData) => {
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        console.log(username);
        console.log(password);
        connectToAPI({username, password});
        if(isLogged) {
            setIsLoading(false);
        }       
    }

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    }

    useEffect(() => {
        fetchAllUsers();
        if(users) {
            setIsLoading(false);
        }
    }, []);

    return (<>
        <section>
            <h3 className="text-center mb-3">Se connecter</h3>

            <form action={handleSubmit} className="d-flex flex-column">
                <label>Comptes fonctionnels :</label>
                <select id="user-select" className="form-select mb-4">
                    {users.map(user => (
                    <option key={user.id} value={user.username}>
                        Username : {user.username} | Password : {user.password}
                    </option>
                    ))}
                </select>
                <hr></hr>
                <h3 className="text-center mb-3">Formulaire</h3>
                <div className="d-flex flex-column">
                    <label htmlFor="username">
                    Nom d'utilisateur :
                    </label>
                    <input type="text" name="username" required/>
                    <label htmlFor="password">
                        Mot de passe :
                    </label>
                    <p>
                        <input type={showPasword ? "text" : "password"} name="password" id="password" minLength={4} required/>
                        <button className="btn object-fit-contain ms-3" onClick={e => { e.preventDefault(); toggleShowPassword(); }}>
                            {showPasword ? "Masquer" : "Afficher"}
                        </button>
                    </p>
                </div>
                <button type="submit" className="btn connexion-button" onClick={() => setIsLoading(true)}>
                    Connexion
                </button>
                {error && (<p className="text-center text-danger">{error}</p>)}
                <button type="reset" className="btn connexion-reset m-4">
                    Réinitialiser les champs
                </button>
            </form>
        </section>
    </>);
}