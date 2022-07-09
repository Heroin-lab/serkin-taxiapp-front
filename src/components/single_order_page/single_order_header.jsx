import React from "react";

import "../../styles/single_order.scss"

const SingleOrderPageHeader = (props) => {

    return (
        <div className="single-order__header">
            <div className="single-order__header_left-block">
                <img src={props.orderInfo.image} alt="#"/>
                <p>{props.orderInfo.first_name} {props.orderInfo.second_name}</p>
                <hr/>
                <h3>{props.orderInfo.vehicle_number}</h3>
            </div>

            <div className="single-order__header_middle-block">
                <p>Order ID: {props.orderInfo.id}</p>
                <p>Order status: {props.orderInfo.status}</p>
                <p>Created at: {props.orderInfo.created_at}</p>
                <p>Ended at: {props.orderInfo.status === "Done" ? props.orderInfo.updated_at : "In process..."}</p>
            </div>

            <div className="single-order__header_right-block">
                <div className="right-block-wrapper">
                    <div className="right-block-wrapper__block">
                        <h3>START LOCATION:</h3>
                        <div className='location'>
                            <h4>LONGITUDE:</h4>
                            <p><strong>{props.orderInfo.start_long}</strong></p>
                        </div>
                        <div className='location'>
                            <h4>LATITUDE:</h4>
                            <p><strong>{props.orderInfo.start_lat}</strong></p>
                        </div>
                    </div>

                    <div style={props.orderInfo.status === "Done" ? {display: "none"} : {display: "flex"}} className="right-block-wrapper__block">
                        <h3>CURRENT LOCATION:</h3>
                        <div className='location'>
                            <h4>LONGITUDE:</h4>
                            <p><strong>{props.orderHistory[0].longitude}</strong></p>
                        </div>
                        <div className='location'>
                            <h4>LATITUDE:</h4>
                            <p><strong>{props.orderHistory[0].latitude}</strong></p>
                        </div>
                    </div>

                    <div className="right-block-wrapper__block">
                        <h3>END LOCATION:</h3>
                        <div className='location'>
                            <h4>LONGITUDE:</h4>
                            <p><strong>{props.orderInfo.end_long}</strong></p>
                        </div>
                        <div className='location'>
                            <h4>LATITUDE:</h4>
                            <p><strong>{props.orderInfo.end_lat}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleOrderPageHeader;