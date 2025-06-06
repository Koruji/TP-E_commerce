import ProductComponent from "~/components/ProductComponent/ProductComponent";
import { ProductProvider } from "~/contexts/ProductContext/ProductContext";

export default function MenuView() {
    return (
        <ProductProvider>
            <ProductComponent></ProductComponent>
        </ProductProvider>
    )
}