import React from "react";
import Modal from "./modal";
import classes from "../css/addVendorForm.module.css"

export default function VendorDetailsModal({openClose, detail}) {

    return(
        <Modal set={openClose}>
            <div className={classes.container}>
                <div className={classes.center}>
                    <input required className={classes.inputForm} placeholder={detail.name} type="text" name="name" id="name" readOnly />
                    <input required className={classes.inputForm} placeholder={detail.address.city} type="text" name="city" id="city" readOnly />
                    <input required className={classes.inputForm} placeholder={detail.address.street} type="text" name="street" id="street" readOnly />
                    <input required className={classes.inputForm} placeholder={detail.address.state} type="text" name="state" id="state" readOnly />
                    <input required className={classes.inputForm} placeholder={detail.address.zip} type="text" name="zip" id="zip" readOnly/>
                    <input required className={classes.inputForm} placeholder={detail.email} type="text" name="email" id="email" readOnly />
                    <input className={classes.inputForm} placeholder={detail.phone} type="tel" name="text" id="phone" readOnly/>
                </div>
            </div>
        </Modal>
    )
}