import ClientConnexionView from "~/pages/ConnexionViews/ClientConnexionView";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Connexion client"},
        {name: "description", content: "auth"}
    ];
}

export default function ClientConnexion()  {
    return <ClientConnexionView/>;
}