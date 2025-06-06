import { useState } from "react";
import "./ReviewComponent.css";

export default function ReviewComponent({maxStars = 5, count = 0}) {
    
    const [rating, setRating] = useState(0);

    const onRating = (value: number) => {
        setRating(value);
    }

    return(
            <div className="d-flex flex-row justify-content-between">
                <p>Notation : </p>
                {Array.from({ length: maxStars }, (_, i) => { 
                    const value = i + 1;
                    return(
                        <i key={value} className="star">
                            <i className="bi bi-star-fill"></i>
                        </i>
                    );
                })}
                <p> | Avis : {count}</p>
            </div>
        );
}