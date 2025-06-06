import { createContext, useState, type ReactNode } from "react";
import type { ProductI } from "~/models/Products/product.interface";

interface ProductContextI {
    products: ProductI[],
    getProducts: () => Promise<void>,
    getOneProduct: (productId: number) => Promise<ProductI>,
    // deleteProduct: (id: number) => void,
    // modifyProduct: (product: ProductI) => void,
    addProductToCart: (product: ProductI) => void,
    deleteProductToCart: (product: ProductI) => void,
    clearCart: () => void,
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

    const getOneProduct = async (productId: number) => {
        let product: ProductI = null!;
        await fetch(`${apiRoot}/products/${productId}`)
        .then(response => response.ok && response.json())
        .then(datas => product = datas)
        .catch(err => setError(`Problème de chargement des données : ${err}`));

        return product;
    }

    const addProductToCart = (product: ProductI) => {
        const existingCart: ProductI[] = JSON.parse(localStorage.getItem("cart") || '[]');
        const alreadyInCart = existingCart.some(p => p.id === product.id);
        if(!alreadyInCart) {
            existingCart.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(existingCart));
    }

    const deleteProductToCart = (product: ProductI) => {
        const existingCart: ProductI[] = JSON.parse(localStorage.getItem("cart") || '[]');
        const newCart = existingCart.filter(p => p.id !== product.id);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    const clearCart = () => {
        localStorage.removeItem("cart");
    };

    return (
        <ProductContext.Provider value={{
            products,
            getProducts,
            getOneProduct,
            // deleteProduct,
            // modifyProduct,
            addProductToCart,
            deleteProductToCart,
            clearCart,
            error
        }}>
            {children}
        </ProductContext.Provider>
    );
} 