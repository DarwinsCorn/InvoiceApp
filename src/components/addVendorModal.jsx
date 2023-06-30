import React from "react";
import Modal from "./modal";
import AddVendorForm from "./addVendorForm";

export default function AddVendorModal({openClose, add}) {

    return(
        <Modal set={openClose} >
            <AddVendorForm set={openClose} add={add}/>
        </Modal>
    )
}