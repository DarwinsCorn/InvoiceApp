import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {data} from '../data/vendorData';
import {data as invData} from '../data/invoiceData';
import classes from '../css/vendors.module.css';
import Search from "../components/search";
import AddVendorModal from "../components/addVendorModal";
import DeleteVendorModal from "../components/deleteVendorModal";

export default function Vendors() {
    const [vendData, setVendData] = useState(data);
    const [toggle, setToggle] = useState(false);
    const [delToggle, setDelToggle] = useState(false);
    const [search, setSearch] = useState("");
    const [delVendor, setDelVendor] = useState("");

    const isInvoices = invData.find(inv => inv.vendorId === delVendor);
    const result = vendData.filter(vend => vend.name.toLowerCase().includes(search.toLowerCase()));

    function openCloseVendorModal() {
        setToggle(prev => !prev);
    }  

    function openCloseDeleteModal() {
        setDelToggle(prev => !prev);
    }  

    function deleteVendor(id) {         
        const index = vendData.findIndex(vendor => vendor.id == id);
        if (index !== -1) {
            setVendData(prev => {
                let newDb = prev.slice(0);
                newDb.splice(index,1);
                return newDb;
            } );           
        } 
        setDelVendor("");
    }

    function addVendor(form) {                                                                
        setVendData(prev => {
                let newDb = prev.slice(0);
                newDb.push({
                    id: prev.length + 1,
                    name: form.name.value,
                    address: {
                        street: form.street.value,
                        city: form.city.value,
                        state: form.state.value,
                        zip: form.zip.value
                    },
                    email: form.email.value,
                    phone: form.phone.value,
                })
                return newDb
            }
        )
    }

    function searchHandle(evt) {
        setSearch(evt.target.value)
    }

    function delProcess() {
        deleteVendor(delVendor);
        openCloseDeleteModal()
    }
  
    useEffect(() => {
        
    },[]);

    const vendors = result.map( vendor => (
        <Link key={vendor.id}>
            <div key={vendor.id} className={classes.strip}>
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
                    <input onClick={() => {openCloseDeleteModal(); setDelVendor(vendor.id)}} type="button" value="Delete" />
                    <Link to={`/invoices/?vendor=${vendor.name}`}><input type="button" value="Invoices" /></Link>
                </div>
            </div>
            
        </Link>
    ));
        
    return(
        <div className={`${classes.center}`}>
            <input id="add"  onClick={openCloseVendorModal} type="button" value="+" />   
            <Search handler={searchHandle} placeholder={"Enter a vendor name..."}/>     
            <div className={classes.cardVendors}>
                {vendors}
            </div>          
            {toggle && <AddVendorModal openClose={openCloseVendorModal} add={addVendor}/>}          
            {delToggle && <DeleteVendorModal openClose={openCloseDeleteModal} click={delProcess} isInvoices={isInvoices}/>}
        </div>
    )
}