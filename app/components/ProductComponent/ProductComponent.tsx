import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { ProductContext } from "~/contexts/ProductContext/ProductContext";
import type { ProductI } from "~/models/Products/product.interface";
import "./ProductComponent.css";

export default function ProductComponent() {
    const {products, getProducts, error} = useContext(ProductContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProducts();
        if(products) {
            setIsLoading(false);
        }
    }, []);

    return (
    <>
        {error !== "" && <p>{error}</p>}

        {isLoading && !error && <p>Chargement des données...</p>}

        {!isLoading && !error && (
            <section className="grid">
                {products.map((item: ProductI) => (
                    <div className="card product-item align-items-center" key={item.id}>
                        <img src={item.image} className="card-img-top"/>
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">
                                {item.price} €
                            </p>
                            <NavLink to={`/product/${item.id}`}>Voir plus</NavLink>
                        </div>
                    </div>
                ))}
            </section>
        )}
    </>
    );

}