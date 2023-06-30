import React from "react";
import Modal from "./modal";
import classes from "../css/deleteVendorModal.module.css";

export default function DeleteVendorModal({openClose,click, isInvoices}) {

    return(
        <Modal set={openClose}>
            {isInvoices ? 
                <div className={classes.center}>
                    <h1>
                        <p>Unable to delete, this vendor has active invoices.</p> 
                        <p>Please delete the invoices first before deleting vendor.</p>
                    </h1>
                </div> :
                <div className={classes.center}>
                    <h1>Are you sure you want to delete the vendor?</h1>
                    <button className={classes.inputBtn} onClick={click}>YES</button>
                    <button className={classes.inputBtn} onClick={openClose}>NO</button>
                </div>            
            }
        </Modal>
    )
}