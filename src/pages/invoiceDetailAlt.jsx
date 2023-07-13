import React from "react";
import classes from '../css/invdetail.module.css';
import { currency } from "../utils/formats";

export default function InvoiceDetailAlt({invDetails, vendDetails, taxed, subtotal, total}) {

    const itemsAlt = invDetails.items.map((item,ix) => (
        <div key={ix} className={classes.mediaCard}>
            <div ><h3 className={classes.mediaBold}>Description</h3></div>
            <div>{item.descrp}</div>
            <h3 className={classes.mediaBold}>Qty</h3>
            <div>{item.qty}</div>
            <h3 className={classes.mediaBold}>Price/Unit</h3>
            <div>{currency.format(item.priceUnit)}</div>
            <h3 className={`${classes.lightHeaders} ${classes.mediaFont}`}>Amount</h3>
            <div className={classes.mediaBold}>{currency.format(item.qty * item.priceUnit)}</div>
        </div>
    ));

    return(
        <div className={classes.center}>
            <section className={`${classes.mediaCard} ${classes.mediaBanner}`}>
                <div >
                    <div className={classes.mediaSize}>
                        <p className={`${classes.font22}`}>{vendDetails.name}</p>
                        <p className={`${classes.xlargeFont70} ${classes.boldFont} ${classes.invWord}`}>INVOICE</p>
                    </div>
                    <div className={classes.mediaSize}>
                        <p className={classes.thinFont18}>{vendDetails.phone}</p>
                        <p className={classes.thinFont18}>{vendDetails.email}</p>
                    </div>
                    <div>
                        <p className={classes.thinFont18}>{vendDetails.address.street}</p>
                        <p className={classes.thinFont18}>{vendDetails.address.city}, {vendDetails.address.state}</p>
                        <p className={classes.thinFont18}>{vendDetails.address.zip}</p>
                    </div>
                </div>
            </section>
            <section className={classes.mediaCard}>
                <div>
                    <div >
                        <div>
                            <p className={`${classes.lightHeaders} ${classes.thinFont18} ${classes.boldFont}`}>Billed to</p>
                        </div>
                    <div>
                        <p className={classes.thinFont18}>Customer info</p>
                    </div>
                    </div>
                    <div>
                        <div>
                            <h1 className={`${classes.lightHeaders} ${classes.thinFont18} ${classes.boldFont}`}>Invoice number</h1>
                            <p className={`${classes.thinFont18}`}>{invDetails.id}</p>
                        </div>
                        <div>
                            <p className={`${classes.lightHeaders} ${classes.thinFont18} ${classes.boldFont}`}>Date of Issue</p>
                            <p className={`${classes.thinFont18}`}>{invDetails.date}</p>
                        </div>
                    </div>
                    <div className={`${classes.invTotal} ${classes.mediaInvHeight}`}>
                        <p className={`${classes.thinFont18} ${classes.boldFont} ${classes.mediaTextAlign}`}>Invoice Total</p>
                        <p className={`${classes.lightHeaders} ${classes.largeFont40} ${classes.boldFont} ${classes.invNum}`}>{currency.format(total)}</p>
                    </div>
                </div>
            </section>
            {itemsAlt}
            <section className={classes.mediaCard}>
                <div className={classes.mediaAlignLeft}>
                    <div className={classes.mediaSeparate}>
                        <div className={classes.lightHeaders}>Subtotal: </div>
                        <div>{currency.format(subtotal)}</div>
                    </div>
                    <div className={classes.mediaSeparate}>
                        <div className={classes.lightHeaders}>Tax (13%):</div>
                        <div>{currency.format(taxed)}</div>
                    </div>
                    <div className={classes.mediaSeparate}>
                        <div className={classes.lightHeaders}>Amount Due (USD):</div>
                        <div>{currency.format(total)}</div>
                    </div>
                </div>
            </section>
        </div>
    )
}