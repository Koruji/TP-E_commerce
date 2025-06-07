import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "~/contexts/auth/AuthContext";
import "./StyleConnexionView.css";

export default function AdminConnexionView() {
    const {createAdmin, disconnectAdmin, isLogged} = useContext(AuthContext);
    const [showPasword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (formData: FormData) => {
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        createAdmin({username, password});   
    }

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    }

    return (
        <section>
            <form action={handleSubmit} className="d-flex flex-column">
                <h3 className="text-center mb-3">Formulaire administrateur</h3>
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
                <button type="submit" className="btn connexion-button" onClick={() => navigate("/")}>
                    Connexion
                </button>
                <button type="reset" className="btn connexion-reset m-4">
                    Réinitialiser les champs
                </button>
            </form>
        </section>
    );
}