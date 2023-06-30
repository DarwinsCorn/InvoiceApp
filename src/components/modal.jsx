import React from "react";
import classes from '../css/modal.module.css';

export default function Modal({set,children}) {
    
    return(
        <div className={classes.background}>
            <div className={classes.modal}>
                <div className={classes.alignButton}>
                    <button className={classes.closeButton} onClick={set}>X</button>
                </div>
                <div className={classes.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}