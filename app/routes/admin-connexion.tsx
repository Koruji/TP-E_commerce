import AdminConnexionView from "~/pages/ConnexionViews/AdminConnexionView";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Connexion admin"},
        {name: "description", content: "auth"}
    ];
}

export default function AdminConnexion()  {
    return <AdminConnexionView/>;
}