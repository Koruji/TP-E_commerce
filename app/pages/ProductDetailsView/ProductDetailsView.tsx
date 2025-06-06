import ProductDetailComponent from "~/components/ProductDetailComponent/ProductDetailComponent";
import { ProductProvider } from "~/contexts/ProductContext/ProductContext";

export default function ProductDetailsView() {
    return (
        <ProductProvider>       
            <ProductDetailComponent></ProductDetailComponent>
        </ProductProvider>
    );
}