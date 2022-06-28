import '../../styles/orders.scss'
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllOrders, reqStringConstructor} from "../../store/reducers/orders";

const dispatcher = async () => {
    let dispatch = useDispatch()
    dispatch(getAllOrders())
}

const ordersElements = (orders) => {
    return (
        <>
            {orders.map((order, index) => (
                <div className='order'>
                    <div className='order__left-block'>
                        <img src={order.image} alt="#"/>
                        <p>{order.first_name} {order.second_name}</p>
                        <hr/>
                        <h3>{order.vehicle_number}</h3>
                    </div>
                    <div className="order__right-block">
                        <h3>ORDER STATUS: {order.order_status}</h3>
                        <div className='location'>
                            <h4>Start location:</h4>
                            <p><strong>{order.start_location}</strong></p>
                        </div>
                        <div className='location'>
                            <h4>End location:</h4>
                            <p><strong>{order.end_location}</strong></p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

const OrdersWindow = () => {
    const allData = useSelector((state) => state.ordersReducer.allData)

    if (allData.length === 0) {
        dispatcher()
    }

    const orders = ordersElements(allData)

    return (
        <div className='board'>
            <div className='inputs'>
                <input type="text"/>
                <div className='reload'></div>
            </div>

            <div className='orders'>
                {orders}
            </div>
        </div>
    )
}

export default OrdersWindow;