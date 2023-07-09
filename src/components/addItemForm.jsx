import React, {useState} from "react";
import classes from '../css/addVendorForm.module.css';

export default function AddItemForm() {
    const [inputValues, setInputValues] = useState([{}]); 
  
    const handleAddInput = () => {
      const newInputValues = [...inputValues, {}];
      setInputValues(newInputValues);
    };
  
    const handleRemoveInput = (index) => {
      const newInputValues = [...inputValues];
      newInputValues.splice(index, 1);
      setInputValues(newInputValues);
    };
      
    return (
    <>
        {inputValues.map((value, index) => (
            <div className={classes.center} key={index}>
                <input
                    name="qty"
                    className={classes.inputForm}
                    required
                    placeholder="Quantity"
                    type="number"
                    value={value.qty}
                    id={`${index}`}
                />
                <input
                    name="priceUnit"
                    className={classes.inputForm}
                    required
                    placeholder="Price per unit"
                    type="number"
                    value={value.priceUnit}
                    id={`${index}`}
                />
                <input
                    name="descrp"
                    className={classes.inputForm}
                    required
                    placeholder="Description"
                    type="text"
                    value={value.descrp}
                    id={`${index}`}
                />
                <button className={classes.submitBtn} type="button" onClick={() => handleRemoveInput(index)}>
                Remove Item
                </button>
            </div>
        ))}
        <button className={classes.submitBtn} type="button" onClick={handleAddInput}>
          Add Item
        </button>
    </>
    );
}