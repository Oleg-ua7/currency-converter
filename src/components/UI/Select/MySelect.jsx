import React, { Fragment } from 'react';
import classes from './MySelect.module.css'

export default function MySelect (props) {

    const handleSelect = (value, e) => {
        props.changeCurrency(value);
    }
    return (
        <Fragment>
            <select className={classes.mySelect} onChange={event => handleSelect(event.target.value)}>
            {(props.options).map((option, index) => (
                <option value={option} key={index}>{option}</option>
            ))}
            </select>
        </Fragment>
    );
};
