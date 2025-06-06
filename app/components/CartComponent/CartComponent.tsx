import { useContext, useEffect, useState } from "react";
import { ProductContext } from "~/contexts/ProductContext/ProductContext";
import type { ProductI } from "~/models/Products/product.interface";
import "./CartComponent.css";
import { NavLink, useNavigate } from "react-router";
import PriceComponent from "../PriceComponent/PriceComponent";

export default function CartComponent() {

    const { deleteProductToCart, clearCart, error} = useContext(ProductContext);
    const [cart, setCart] = useState<ProductI[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
        if (event.key === "cart") {
        const updatedCart = event.newValue ? JSON.parse(event.newValue) : [];
        setCart(updatedCart);
        }
    };

    window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    useEffect(() => {
        let storageCart = localStorage.getItem("cart");
        let storage: ProductI[] = storageCart ? JSON.parse(storageCart) : [];
        setCart(storage);
    }, []);

    const handleDeleteFromCart = (product: ProductI) => {
        deleteProductToCart(product);
        const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(updatedCart);
    };

    const handleDeleteAllCart = () => {
        clearCart();
        const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(updatedCart);
    };

    return (
        <>
            {error !== "" && <p>{error}</p>}

            {cart.length === 0 && !error && (
                <>
                    <p>Aucun article dans le panier.</p>
                    <button onClick={() => navigate("/")} className="btn">Continuer vos achats</button>
                </>
            )}

            {cart.length > 0 && !error && (
                <>
                <button className="btn trash m-4" onClick={() => handleDeleteAllCart()}>
                    <i className="bi bi-trash-fill">Vider le panier</i>
                </button>
                <ul className="list-group list-group-flush">
                    {cart && cart.map((item: ProductI) => (
                        <li className="list-group-item list-item bg-transparent" key={item.id}>
                            <img className="product-image" src={item.image}/>
                            <div>
                                <h5>{item.title}</h5>
                                <p>{item.price} €</p>
                            </div>
                            <button className="btn delete" onClick={() => handleDeleteFromCart(item)}>
                                <i className="bi bi-dash-square"></i>
                            </button>
                        </li>
                    ))}
                    <PriceComponent cart={cart}/>
                </ul>
                </>
            )}
        </>
    );
}