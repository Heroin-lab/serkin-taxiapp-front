import React, {useEffect, useState} from "react";
import CustomSelect from 'react-select';
import "../../styles/select-box.scss";
import {useDispatch} from "react-redux";
import {changeStatus, getAllOrders} from "../../store/reducers/orders";

const techCompanies = [
    { label: "Created", value: 1 },
    { label: "In Progress", value: 2 },
    { label: "Done", value: 3 },
];

const customStyles = {
    control: base => ({
        ...base,
        background: "#222222",
        height: 45,
        width: 200,
        minHeight: 45,
        borderRadius: 28
    }),
    singleValue: (provided, state) => ({
       ...provided,
       color: "#FFFFFF",
        margin: "0 0 20px 10px",
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        height: 45,
        minHeight: 45,
        borderRadius: 28
    }),
}



const SelectBox = () => {
    const dispatch = useDispatch()

    return (
        <CustomSelect onChange={(event) => dispatch(changeStatus(event.value))} defaultValue={techCompanies[1]}
                      isSearchable={false}
                      styles={customStyles}
                      options={techCompanies}/>
    )
}

export default SelectBox;
