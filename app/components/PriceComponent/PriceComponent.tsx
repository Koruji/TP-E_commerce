import { useEffect, useState } from "react";
import type { ProductI } from "~/models/Products/product.interface";
import "./PriceComponent.css";

interface PriceComponentProps {
  cart: ProductI[];
}

export default function PriceComponent({cart = []}: PriceComponentProps) {

    const [price, setPrice] = useState(0);

    const calculatePrice = () => {
        let price = 0;
        cart.forEach(product => {
            price += product.price;
        });
        let tva = price * 0.2;
        price = price + tva;
        setPrice(price);
    };

    useEffect(() => (
        calculatePrice()
    ));

    return (
        <section className="d-flex flex-row justify-content-between prix">
            <p><strong>Prix total</strong></p>
            <p>{price} €</p>
            <p className="text-danger">TVA 20%</p>
        </section>
    );
}