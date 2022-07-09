import React from "react";

const SingleOrderHistory = (props) => {
    if (!props.orderHistory) return <div></div>

    return (
        <div className="single-order__list">
            {props.orderHistory.map((item, index) => (
                <div className="single-order__list_item">
                    <h4>{props.amountOfRows-index - (props.offsetCounter * 5)}</h4>
                    <div className="wrapper">
                        <p>Time: <strong>{`${item.created_at.slice(11, 19)}`}</strong></p>
                        <p>Longitude: <strong>{item.longitude}</strong></p>
                        <p>Latitude: <strong>{item.latitude}</strong></p>
                    </div>
                </div>
            ))}
        </div>
        )
}

export default SingleOrderHistory;