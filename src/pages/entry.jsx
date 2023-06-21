import React from "react";
import { Link } from "react-router-dom";
import '../css/entry.css';

export default function Entry() {

    return(
        <div className="container ">
            <div className="card">
                <Link to={"/vendors"}>
                    <h1 >VENDORS</h1>
                </Link>                
            </div>
            <div className="card">               
                <Link to={"/invoices"}>                
                    <h1 >INVOICES</h1>   
                </Link>
            </div>
        </div>
    )
}