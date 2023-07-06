import React from "react";
import Modal from "./modal";
import AddInvoiceForm from "./addInvoiceForm";

export default function AddInvoiceModal({openClose, add}) {

    return(
        <Modal set={openClose}>
            <AddInvoiceForm add={add} set={openClose}/>
        </Modal>
    )
}