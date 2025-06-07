import { NavLink } from "react-router";
import "./Header.css";
import { useContext } from "react";
import { AuthContext } from "~/contexts/auth/AuthContext";

export default function Header() {
    const {isLogged} = useContext(AuthContext);

    return (
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <i className="logo bi bi-shop"></i>
                <span className="fs-4 ml-2">MarketPlace</span>
            </a>

            <ul className="nav">
                <NavLink to="/" className="btn text-decoration-none">
                    Menu
                </NavLink>
                {isLogged ? (
                    <NavLink to="/deconnexion" className="btn btn-danger text-decoration-none">
                        Se déconnecter
                    </NavLink>
                ) : (
                    <NavLink to="/connexion" className="btn text-decoration-none">
                        Se connecter
                    </NavLink>
                )}
                <NavLink to="/cart" className="btn text-decoration-none">
                    <i className="bi bi-basket"></i>
                </NavLink>
            </ul>
        </header>
    );
}