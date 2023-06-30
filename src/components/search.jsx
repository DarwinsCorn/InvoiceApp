import React from "react";
import classes from '../css/search.module.css';

export default function Search({handler,placeholder}) {

    return(
        <div className={classes.searchCenter}>
            <input onChange={handler} className={classes.search} type="search" name="searchBar" id="searchBar" placeholder={placeholder}/>
            <button className={classes.searchButton}>Search</button>
        </div>
    )
}