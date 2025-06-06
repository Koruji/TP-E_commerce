import MenuView from "~/pages/MenuView/MenuView";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MarketPlace" },
    { name: "description", content: "Page de menu de MarketPlace" },
  ];
}

export default function Home() {
  return <MenuView/>;
}
