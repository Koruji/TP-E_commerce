import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    ...prefix("product", [
        index("routes/product-detail.tsx"),
        route(":productId", "pages/ProductDetailsView/ProductDetailsView.tsx")
    ]),
] satisfies RouteConfig;
