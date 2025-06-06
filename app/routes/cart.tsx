import CartView from "~/pages/CartView/CartView";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Panier" },
    { name: "description", content: "Visualisation du panier" },
  ];
}

export default function Cart() {
  return <CartView/>;
}