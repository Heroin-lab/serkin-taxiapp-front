import '../../styles/orders.scss'
import React from "react";

const OrdersWindow = () => {
    let ordersData = [{
        image: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
        first_name: "Kirill",
        second_name: "Serkin",
        vehicle_number: "AX 4567 HH",
        order_status: "Created",
        longitude: "54.12345",
        latitude: "34.12345"
    },{
        image: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
        first_name: "Kirill",
        second_name: "Serkin",
        vehicle_number: "AX 4567 HH",
        order_status: "Created",
        longitude: "54.12345",
        latitude: "34.12345"
    },{
        image: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
        first_name: "Kirill",
        second_name: "Serkin",
        vehicle_number: "AX 4567 HH",
        order_status: "Created",
        longitude: "54.12345",
        latitude: "34.12345"
    },{
        image: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
        first_name: "Kirill",
        second_name: "Serkin",
        vehicle_number: "AX 4567 HH",
        order_status: "Created",
        longitude: "54.12345",
        latitude: "34.12345"
    }]

    return (
        <div className='board'>
            <div className='inputs'>
                <input type="text"/>
                <div className='reload'></div>
            </div>

            <div className='orders'>
                <div className='order'>
                    <div className='order__left-block'>
                        <img src="https://cdn-icons-png.flaticon.com/512/219/219986.png" alt="#"/>
                        <p>Kirill Serkin</p>
                        <hr/>
                        <h3>AX 4567 HH</h3>
                    </div>
                    <div className="order__right-block">
                        <h3>ORDER STATUS: CREATE</h3>
                        <div className='location'>
                            <h4>longitude:</h4>
                            <p><strong>54.12345</strong></p>
                        </div>
                        <div className='location'>
                            <h4>latitude:</h4>
                            <p><strong>34.12345</strong></p>
                        </div>
                    </div>
                </div>
                <div className='order'>
                    <div className='order__left-block'>
                        <img src="https://cdn-icons-png.flaticon.com/512/219/219986.png" alt="#"/>
                        <p>Kirill Serkin</p>
                        <hr/>
                        <h3>AX 4567 HH</h3>
                    </div>
                    <div className="order__right-block">
                        <h3>ORDER STATUS: CREATE</h3>
                        <div className='location'>
                            <h4>longitude:</h4>
                            <p><strong>54.12345</strong></p>
                        </div>
                        <div className='location'>
                            <h4>latitude:</h4>
                            <p><strong>34.12345</strong></p>
                        </div>
                    </div>
                </div>
                <div className='order'>
                    <div className='order__left-block'>
                        <img src="https://cdn-icons-png.flaticon.com/512/219/219986.png" alt="#"/>
                        <p>Kirill Serkin</p>
                        <hr/>
                        <h3>AX 4567 HH</h3>
                    </div>
                    <div className="order__right-block">
                        <h3>ORDER STATUS: CREATE</h3>
                        <div className='location'>
                            <h4>longitude:</h4>
                            <p><strong>54.12345</strong></p>
                        </div>
                        <div className='location'>
                            <h4>latitude:</h4>
                            <p><strong>34.12345</strong></p>
                        </div>
                    </div>
                </div>
                <div className='order'>
                    <div className='order__left-block'>
                        <img src="https://cdn-icons-png.flaticon.com/512/219/219986.png" alt="#"/>
                        <p>Kirill Serkin</p>
                        <hr/>
                        <h3>AX 4567 HH</h3>
                    </div>
                    <div className="order__right-block">
                        <h3>ORDER STATUS: CREATE</h3>
                        <div className='location'>
                            <h4>longitude:</h4>
                            <p><strong>54.12345</strong></p>
                        </div>
                        <div className='location'>
                            <h4>latitude:</h4>
                            <p><strong>34.12345</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrdersWindow;