import CartComponent from "~/components/CartComponent/CartComponent";
import { ProductProvider } from "~/contexts/ProductContext/ProductContext";

export default function CartView() {
    return (
        <ProductProvider>
            <CartComponent></CartComponent>
        </ProductProvider>
    );
}