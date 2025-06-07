import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { ProductContext } from "~/contexts/ProductContext/ProductContext";
import type { ProductI } from "~/models/Products/product.interface";
import "./ProductComponent.css";
import { AuthContext } from "~/contexts/auth/AuthContext";
import { ProductModalComponent } from "../ProductModalComponent/ProductModalComponent";

export default function ProductComponent() {
    const {products, getProducts, error} = useContext(ProductContext);
    const {isLoggedAdmin} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<number>(null!);
    const [currentPage, setCurrentPage] = useState(1);
    
    const pages = 5;
    const indexOfLastProduct = currentPage * pages;
    const indexOfFirstProduct = indexOfLastProduct - pages;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / pages);


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

        {isLoggedAdmin && (<h3 className="text-center text-danger mb-3"><strong>Connexion administrateur</strong></h3>)}

        {!isLoading && !error && (
            <>
            <section className="grid">
                {currentProducts.map((item: ProductI) => (
                    <div className="card product-item text-center" key={item.id}>
                        <img src={item.image} className="card-img-top"/>
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">
                                {item.price} €
                            </p>
                            {isLoggedAdmin && (
                                <button className="btn" onClick={() => {
                                    setShowModal(true);
                                    setSelectedProduct(item.id);
                                }}>
                                    <i className="bi bi-gear-fill">Modifier le produit</i>
                                </button>
                            )}
                        </div>
                        <div className="card-footer text-body-secondary text-center card-foot">
                            <NavLink to={`/product/${item.id}`}>Voir plus</NavLink>
                        </div>
                    </div>
                ))}
                <ProductModalComponent showModal={showModal} selectedProduct={selectedProduct} onClose={() => {
                    setShowModal(false);
                    getProducts();
                }}/>
            </section>
            <div className="pagination m-4">
                <button
                    className="btn page"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}>
                        Précédent
                </button>
                    
                <span>Page {currentPage} / {totalPages}</span>

                <button
                    className="btn page"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}>
                        Suivant
                </button>
            </div>
            </>
        )}
    </>
    );

}