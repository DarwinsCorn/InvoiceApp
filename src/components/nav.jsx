import React from "react";
import '../css/nav.css';
import { Link } from "react-router-dom";


export default function Nav() {

    return(
        <nav>
            <Link to={"/"}>
            <h1 className="logo">#LOGO</h1>
            </Link>
            <h2 className="user">USER</h2>
        </nav>
    )
}