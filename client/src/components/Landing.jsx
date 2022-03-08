import React from "react"
import {Link} from "react-router-dom"
import "./Landing.css"

export default function Landing(){
    return(
        <div className="image8">
            <h1 className="title">Welcome To Our Page!!!</h1>
            <Link to ="/home">
                <button className="buttom">Home</button>
            </Link>
        </div>
    )
}