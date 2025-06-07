import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    ...prefix("product", [
        index("routes/product-detail.tsx"),
        route(":productId", "pages/ProductDetailsView/ProductDetailsView.tsx")
    ]),
    route("cart", "routes/cart.tsx"),
    route("connexion", "routes/client-connexion.tsx"),
    route("success-log", "pages/ConnexionViews/ClientProfilView.tsx"),
    route("deconnexion", "pages/ConnexionViews/ClientDeconnexionView.tsx"),
] satisfies RouteConfig;
