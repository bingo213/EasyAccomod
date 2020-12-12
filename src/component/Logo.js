import React from 'react'
import logo from '../assets/img/logo.png'

function Logo() {
    const imgStyle = {
        width: "5rem",
        height: "5rem",
    };

    return (
        <div>
            <img src={logo} alt="" style={imgStyle}/>
            <p>EasyAccomod</p>
        </div>
    )
}

export default Logo
