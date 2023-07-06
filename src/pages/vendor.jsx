import React, {useState} from "react";
import {Link} from 'react-router-dom';
import classes from '../css/vendors.module.css';
import Search from "../components/search";
import AddVendorModal from "../components/addVendorModal";
import DeleteVendorModal from "../components/deleteVendorModal";
import VendorDetailsModal from "../components/vendorDetailsModal";
import { getLocalStorageDB, setLocalStorageDB } from "../utils/db";

export default function Vendors({data, setData}) {
    const [toggle, setToggle] = useState(false);
    const [delToggle, setDelToggle] = useState(false);
    const [detailsToggle, setDetailsToggle] = useState(false);
    const [search, setSearch] = useState("");
    const [delVendor, setDelVendor] = useState("");
    const [detailVendor, setDetailVendor] = useState({});

    const vendData = data.filter(data => data.type === "vendor");
    const invData = data.filter(data => data.type === "invoice");

    const isInvoices = invData.find(inv => inv.vendorId === delVendor);
    const result = vendData.filter(vend => vend.name.toLowerCase().includes(search.toLowerCase()));

    function openCloseVendorModal() {
        setToggle(prev => !prev);
    }  

    function openCloseDeleteModal() {
        setDelToggle(prev => !prev);
    }  

    function openCloseVendorDetails() {
        setDetailsToggle(prev => !prev);
    }

    function deleteVendor(id) {    
        let db = getLocalStorageDB().slice(0);

        const index = db.findIndex(vendor => vendor.id == id);
        if (index !== -1) db.splice(index,1);

        setLocalStorageDB(db);
        setData(db);

        setDelVendor("");
    }

    function addVendor(form) {               
        let db = getLocalStorageDB().slice(0);

        db.push(
            {
                id: vendData.length + 1,
                type: "vendor",
                name: form.name.value,
                address: {
                    street: form.street.value,
                    city: form.city.value,
                    state: form.state.value,
                    zip: form.zip.value
                },
                email: form.email.value,
                phone: form.phone.value,
            }
        )
        setLocalStorageDB(db);
        setData(db);
    }

    function searchHandle(evt) {
        setSearch(evt.target.value)
    }

    function delProcess() {
        deleteVendor(delVendor);
        openCloseDeleteModal()
    }

    const vendors = result.map( vendor => (
        <div onClick={(e) => {openCloseVendorDetails(); setDetailVendor(vendor);}} key={vendor.id} className={classes.strip}>
            <div className={classes.stripVendorFields}>
                <div>
                    <h2 >{vendor.name}</h2>
                </div>
                <div>
                    <h2 className={classes.normalFont18}>{vendor.email}</h2>
                </div>
                <div>
                    <h2>{vendor.address.city}, {vendor.address.state}</h2>
                </div>
            </div>
            <div className={classes.addDelDiv}>
                <input onClick={(e) => {openCloseDeleteModal(); setDelVendor(vendor.id);e.stopPropagation()}} type="button" value="Delete" />
                <Link to={`/invoices/?vendor=${vendor.name}`}><input type="button" value="Invoices" /></Link>
            </div>
        </div>
    ));
        
    return(
        <div className={`${classes.center}`}>
            <input id="addVendor" name="add"  onClick={openCloseVendorModal} type="button" value="+" />   
            <Search handler={searchHandle} placeholder={"Search a vendor name..."}/>     
            <div className={classes.cardVendors}>
                {vendors}
            </div>          
            {toggle && <AddVendorModal openClose={openCloseVendorModal} add={addVendor}/>}          
            {delToggle && <DeleteVendorModal openClose={openCloseDeleteModal} click={delProcess} isInvoices={isInvoices}/>}
            {detailsToggle && <VendorDetailsModal openClose={openCloseVendorDetails} detail={detailVendor}/>}
        </div>
    )
}