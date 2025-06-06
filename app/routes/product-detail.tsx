import ProductDetailsView from "~/pages/ProductDetailsView/ProductDetailsView";
import type { Route } from "./+types/home";
import { ProductProvider } from "~/contexts/ProductContext/ProductContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product details" },
    { name: "description", content: "Detail d'un produit" },
  ];
}

export default function ProductDetail() {
    return (
        <ProductDetailsView/>
    );
}