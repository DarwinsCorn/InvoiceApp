import React, {useState} from "react";
import classes from '../css/modal.module.css';

export default function Modal({set,children}) {
    
    const [winHeight, setWinHeight] = useState(window.innerHeight)
    document.body.style.overflow = "hidden";
    
    window.addEventListener('resize', () => {
        setWinHeight(window.innerHeight)
    })

    function closingProcess() {
        document.body.style.overflow = "";
        set();
    }

    const modalStyle = {
        height: winHeight,
    }
    
    return(
        <div style={modalStyle} className={classes.background}>
            <div className={classes.modal}>
                <div className={classes.alignButton}>
                    <button className={classes.closeButton} onClick={closingProcess}>X</button>
                </div>
                <div className={classes.content}>
                    {children}
                </div>
                <div className={classes.alignButton}></div>
            </div>
        </div>
    )
}