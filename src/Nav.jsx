import React from 'react';
import { Link } from 'react-router-dom';
import "./App.css";

function Nav({ totalState }) {
    let color;
    if (totalState > 100) {
        color = "green";
    } else if (totalState >= 0) {
        color = "yellow";
    } else {
        color = "red";
    }

    return (
        <div className='nav-container'>
            <h1 className='title'>Budget App</h1>
            <h2 style={{ color }}>Bank Account Total: {totalState < 0 ? "-$" + Math.abs(totalState) : "$" + totalState}</h2>
            <Link to="/new">
                <button className='nav-button'>New Transaction</button>
            </Link>
        </div>
    );
}

export default Nav;
