import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { ProductContext } from "~/contexts/ProductContext/ProductContext";
import type { ProductI } from "~/models/Products/product.interface";
import "./ProductDetailComponent.css";
import ReviewComponent from "../ReviewComponent/ReviewComponent";

export default function ProductDetailComponent() {
    const params = useParams();
    const navigate = useNavigate();
    const productId = Number(params.productId);
    const {getOneProduct, addProductToCart, deleteProductToCart, error} = useContext(ProductContext);
    const [isLoading, setIsLoading] = useState(true);
    const [productDetail, setProductDetail] = useState({} as ProductI);

    useEffect(() => {
        if(isLoading) {
            (async function fetchProduct() {
                const product = await getOneProduct(productId);
                if(product){
                    setProductDetail(product);
                    setIsLoading(false);
                } 
            })();
        }
    });

    return (
        <>
            {error !== "" && <p>{error}</p>}

            {isLoading && !error && <p>Chargement des données...</p>}

            {!isLoading && !error && (<article className="product">
                <h1 className="text-center mb-4">Informations du produit</h1>
                <section className="product-detail shadow-sm">
                    <img src={productDetail.image} className="product-img m-4"/>
                    <h5 className="m-2">{productDetail.title}</h5>
                    <p className="container text-center">{productDetail.description}</p>
                    {productDetail.rating && (
                        <ReviewComponent maxStars={productDetail.rating?.rate} count={productDetail.rating?.count}/>
                    )}
                </section>
                <div className="d-flex justify-content-center flex-column m-4 product-shop">
                    <h5>Ajoutez cet article à votre panier <i className="bi bi-basket"></i></h5>
                    <button className="btn add-cart m-2" onClick={() => {
                            addProductToCart(productDetail);
                            navigate("/cart");
                        }}>Ajouter au panier</button>
                    <NavLink to="/" className="btn m-4"><i className="bi bi-house-door-fill"></i></NavLink>
                </div>
            </article>)}
        </>
    );
}