import React from "react";
import { Link } from "react-router-dom";
import '../css/nav.css';


export default function Nav() {

    function reset() {
        sessionStorage.clear();
        location.reload(true)
    }

    return(
        <nav>
            <Link to={"/"}>
            <h1 className="logo">MAIN</h1>
            </Link>
            <h2 onClick={reset} className="user cursor">RESET DEMO</h2>
        </nav>
    )
}