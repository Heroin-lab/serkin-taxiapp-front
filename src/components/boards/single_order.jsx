import '../../styles/single_order.scss'
import '../../styles/orders.scss'
import logOutIcon from "../../assets/log-out-icon.png";

import {logOutUser} from "../../store/reducers/auth";
import React, {useEffect, useState} from "react";
import Popup from 'reactjs-popup';
import {useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {GetAllHistoryMarkers, GetOrderDataById, GetOrderHistory} from "../../store/reducers/single_order";
import MyMapComponent from "./map"

const SingleOrder = () => {
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()

    const [updateOrder, callUpdateOrder] = useState(1)
    const [offsetCounter, setOffsetCounter] = useState(0)

    useEffect(() => {
        dispatch(GetOrderDataById(location.pathname.slice(8), history))
    }, [updateOrder])

    useEffect(() => {
        dispatch(GetOrderHistory(location.pathname.slice(8), offsetCounter, history))
    }, [offsetCounter])

    useEffect(() => {
        dispatch(GetAllHistoryMarkers(location.pathname.slice(8), history))
    }, [])

    let orderInfo = useSelector((state) => state.singleOrderReducer.orderInfo)
    let orderHistory = useSelector((state) => state.singleOrderReducer.orderHistory)
    let amountOfRows = useSelector(state => state.singleOrderReducer.amountOfRows)
    let allMarkers = useSelector(state => state.singleOrderReducer.allMarkers)

    let pageAmount = Math.ceil(amountOfRows/5)
    let pageArray = [pageAmount - 2, pageAmount -1, pageAmount]

    const createPageArray = () => {
        let add = 0
        if (offsetCounter > 7) return
        pageArray = []
        for (let i=0; i <= 3; i++) {
            add = i+offsetCounter
            if (add < 1 || add > pageAmount) continue
            pageArray.push(add)
        }
    }
    createPageArray()

    return (
        <div className="single-order">

            <div className="single-order__wrapper">
                <div className='inputs'>
                    <div>
                    </div>
                    <div onClick={() => {
                        dispatch(logOutUser())
                        history.push("/sign-in")
                    }}
                         className='log-out'>
                        <img src={logOutIcon} alt="#"/>
                    </div>
                </div>

                <div className="single-order__header">
                    <div className="single-order__header_left-block">
                        <img src={orderInfo.image} alt="#"/>
                        <p>{orderInfo.first_name} {orderInfo.second_name}</p>
                        <hr/>
                        <h3>{orderInfo.vehicle_number}</h3>
                    </div>

                    <div className="single-order__header_middle-block">
                        <p>Order ID: {orderInfo.id}</p>
                        <p>Order status: {orderInfo.status}</p>
                        <p>Created at: {orderInfo.created_at}</p>
                        <p>Ended at: {orderInfo.updated_at}</p>
                    </div>

                    <div className="single-order__header_right-block">
                        <div className="right-block-wrapper">
                            <div className="right-block-wrapper__block">
                                <h3>START LOCATION:</h3>
                                <div className='location'>
                                    <h4>LONGITUDE:</h4>
                                    <p><strong>{orderInfo.start_long}</strong></p>
                                </div>
                                <div className='location'>
                                    <h4>LATITUDE:</h4>
                                    <p><strong>{orderInfo.start_lat}</strong></p>
                                </div>
                            </div>

                            <div className="right-block-wrapper__block">
                                <h3>END LOCATION:</h3>
                                <div className='location'>
                                    <h4>LONGITUDE:</h4>
                                    <p><strong>{orderInfo.end_long}</strong></p>
                                </div>
                                <div className='location'>
                                    <h4>LATITUDE:</h4>
                                    <p><strong>{orderInfo.end_lat}</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="single-order__list">
                    {orderHistory.map((item, index) => (
                        <div className="single-order__list_item">
                            <h4>{amountOfRows-index - (offsetCounter * 5)}</h4>
                            <div className="wrapper">
                                <p>Time: <strong>{item.created_at}</strong></p>
                                <p>Longitude: <strong>{item.longitude}</strong></p>
                                <p>Latitude: <strong>{item.latitude}</strong></p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="paginator-wrapper">
                    <div className="paginator">
                        <i onClick={() => offsetCounter > 0 ? setOffsetCounter(offsetCounter-1) : false}
                           className="paginator__arrow left"
                        ></i>
                        <div style={{display: "inline-block"}}
                             className="paginator__counter">
                            <h3 style={offsetCounter > 1 ? {display: "inline-block"} : {display: "none"}}
                                onClick={() => setOffsetCounter(0)}
                            >1</h3>

                            <h3 style={offsetCounter > 2 ? {display: "inline-block"} : {display: "none"}}
                                onClick={() => offsetCounter > 0 ? setOffsetCounter(offsetCounter-1) : false}
                            >...</h3>

                            {pageArray.map((page, index) => (
                                <h3 className={offsetCounter +1 === page ? 'active' : ""} onClick={() => setOffsetCounter(page - 1)}>
                                    {page}
                                </h3>
                            ))}

                            <h3 style={offsetCounter < pageAmount -4 && pageAmount > 4 ? {display: "inline-block"} : {display: "none"}}
                                onClick={() => offsetCounter+1 < pageAmount ? setOffsetCounter(offsetCounter+1) : false}
                            >...</h3>

                            <h3 style={offsetCounter < pageAmount -3 ? {display: "inline-block"} : {display: "none"}}
                                onClick={() => setOffsetCounter(pageAmount -1)}
                            >{pageAmount}</h3>

                        </div>
                        <i onClick={() => offsetCounter+1 < pageAmount ? setOffsetCounter(offsetCounter+1) : false}
                           className="paginator__arrow right"
                        ></i>
                    </div>
                </div>
            </div>

            <Popup trigger={
                <div style={orderInfo.status === "Done" ? {display: "block"} : {display: "none"}}
                     className="single-order__map">
                    <h3>MAP</h3>
                </div>} modal>
                {close => (
                    <div className="map">
                        <a className="close" onClick={close}>
                            &times;
                        </a>
                        <MyMapComponent isMarkerShown allMarkers={allMarkers} />
                    </div>
                )}
            </Popup>

        </div>
    )
}

export default SingleOrder;

