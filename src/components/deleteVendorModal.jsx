import React from "react";
import Modal from "./modal";

export default function DeleteVendorModal({openClose,click, isInvoices}) {

    return(
        <Modal set={openClose}>
            {isInvoices ? 
                <h1>Unable to delete, this vendor has active invoices. Please delete the invoices first before deleting vendor.</h1> :
                <div>
                    <h1>Are you sure you want to delete the vendor?</h1>
                    <button onClick={click}>YES</button>
                    <button onClick={openClose}>NO</button>
                </div>            
            }
        </Modal>
    )
}