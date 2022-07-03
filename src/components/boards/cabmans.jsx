import React from "react";

import reloadIcon from '../../assets/refresh-icon.png'
import ava from '../../assets/ava.jpg'
import '../../styles/orders.scss'
import '../../styles/cabmans.scss'

const CabMansWindow = () => {
    return (
        <div className='board'>
            <div className='inputs'>
                <div></div>
                <div onClick={() => dispatch()}
                     className='reload'>
                    <img src={reloadIcon} alt="#"/>
                </div>
            </div>

            <div className="drivers-cards">
                <div className="drivers-cards__card">
                    <div className="drivers-cards__card_wrapper">
                        <img src={ava} alt="#"/>
                        <div className="drivers-cards__card_creds">
                            <p>Kirill</p>
                            <p>Serkin</p>
                        </div>
                        <hr/>
                        <h3>AX 4545 DD</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CabMansWindow;