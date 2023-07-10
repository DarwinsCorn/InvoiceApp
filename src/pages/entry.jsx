import React from "react";
import { Link } from "react-router-dom";
import '../css/entry.css';

export default function Entry() {

    
    return(
        <div className="container ">
            <Link to={"/vendors"}>
                <div className="card">
                    <h1 >VENDORS</h1>
                </div>
            </Link>                
            <Link to={"/invoices"}>                
                <div className="card">               
                     <h1 >INVOICES</h1>   
                </div>
            </Link>
        </div>
    )
}