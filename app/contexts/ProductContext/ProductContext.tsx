import { createContext, useState, type ReactNode } from "react";
import type { ProductI } from "~/models/Products/product.interface";

interface ProductContextI {
    products: ProductI[],
    getProducts: () => Promise<void>,
    // deleteProduct: (id: number) => void,
    // modifyProduct: (product: ProductI) => void,
    // addProductToCart: (product: ProductI) => void,
    error: string
}

export const ProductContext = createContext<ProductContextI>(null!);

export const ProductProvider = ({children} : {children: ReactNode}) => {
    const apiRoot = "https://fakestoreapi.com";
    const [products, setProducts] = useState<ProductI[]>([]);
    const [error, setError] = useState<string>("");

    const getProducts = async () => {
        await fetch(`${apiRoot}/products`)
        .then(response => response.ok && response.json())
        .then(datas => setProducts(datas))
        .catch(err => setError(`Problème de chargement des données : ${err}`));
    }

    return (
        <ProductContext.Provider value={{
            products,
            getProducts,
            // deleteProduct,
            // modifyProduct,
            // addProductToCart,
            error
        }}>
            {children}
        </ProductContext.Provider>
    );
} 