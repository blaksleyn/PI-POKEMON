import React from "react";
import "./Card.css"
export default function Card({name, image, types}) {
    return (
        <div className="card">
            <h3 className="name1">{name}</h3>
            <h5 className="name2">{types}</h5>
            <img src={image} alt="This image doesnt exists"/>
        </div>
    );
}