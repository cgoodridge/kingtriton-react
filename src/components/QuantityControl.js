import React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import '../css/quantityControl.css';

const QuantityControl = ({ qtyValue, handleQtyAdd, handleQtySub, setQtyValue }) => {

    return (
        <div className="counter">
            <IconButton
                disabled={qtyValue <= 1}
                color="secondary"
                className="square-button"
                size="small"
                style={{backgroundColor: "#2196f3"}}
                onClick={handleQtySub}
            >
                <RemoveIcon fontSize="inherit" className="icon-white"/>
            </IconButton>
            <input
                type="number"
                inputprops={{style: { color: "#5f5f5f" } }}
                min="0"
                value={qtyValue}
                onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setQtyValue(isNaN(value) ? 1 : value);
                }}
                className="qtyField"
            ></input>

            <IconButton color="secondary" className="square-button" size="small" style={{backgroundColor: "#2196f3"}} onClick={handleQtyAdd}>
                <AddIcon fontSize="inherit" className="icon-white"/>
            </IconButton>
        </div>
    );
};

export default QuantityControl;