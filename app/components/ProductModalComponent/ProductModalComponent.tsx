import { createContext, useContext, useEffect, useState } from "react";
import { ProductContext } from "~/contexts/ProductContext/ProductContext";
import type { ProductI } from "~/models/Products/product.interface";
import "./ProductModalComponent.css";

export const ProductModalComponent = ({showModal, selectedProduct, onClose}: {
    showModal: boolean;
    selectedProduct: number;
    onClose: () => void;
}) => {
    if(!showModal) return null;

    const {getOneProduct, error} = useContext(ProductContext);
    const [product, setProduct] = useState<ProductI>(null!);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: product?.title || "",
        price: product?.price || "",
        description: product?.description || ""
    });

    const handleSubmit = (formData: FormData) => {
        //recup de toutes les nouvelles infos 
        //envoi vers endpoint
        //reception reponse si erreur l'afficher
        //fermeture modale
    }

    useEffect(() => {
        if(isLoading) {
            (async function fetchProduct() {
                const oneProduct = await getOneProduct(selectedProduct);
                if(oneProduct){
                    setProduct(oneProduct);
                    setIsLoading(false);
                } 
            })();
        }
    });

    useEffect(() => {
        if (product) {
            setFormData({
            title: product.title || "",
            price: product.price || "",
            description: product.description || ""
            });
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };



    return(
        <>
        {showModal && <div className="modal-overlay" onClick={onClose}></div>}

        <div className={`modal-container ${showModal ? 'visible' : ''}`}>
            <div className="modal-inner">
                <button className="modal-close" onClick={onClose}>X</button>
                <h2 className="text-center">Informations du produit</h2>
                <form action={handleSubmit} className="d-flex flex-column p-4">
                    <label htmlFor="title">Nom du produit :</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required/>
                    <label htmlFor="description">Description :</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required/>
                    <label htmlFor="price">Prix :</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required/>
                </form>        
            </div>
        </div>
        </>
    );

}