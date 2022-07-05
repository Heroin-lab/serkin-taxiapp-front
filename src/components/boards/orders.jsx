import '../../styles/orders.scss'
import logOutIcon from '../../assets/log-out-icon.png'

import React, {useState, useEffect, useReducer} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    ChangeDriverFilter,
    ChangeLimit,
    ChangeOffset,
    ChangeStatus,
    GetAllOrders,
    GetDriversNames,
} from "../../store/reducers/orders";
import {logOutUser} from "../../store/reducers/auth";
import CustomSelect from "react-select";
import {useHistory} from "react-router-dom";

const UseGetAllOrders = () => {
    let dispatch = useDispatch()
    dispatch(GetAllOrders())
    dispatch(GetDriversNames())
}

const statuses = [
    { label: "Created", value: 1 },
    { label: "In Progress", value: 2 },
    { label: "Done", value: 3 },
];

const allDriversNames = (allDriverInfo) => {
    let allDrivers = allDriverInfo
    let driversSelectData = [{ label: "Clear Filter", value: 0}]
    for (let i=0; i < allDrivers.length; i++) {
        driversSelectData.push({ label: `${allDrivers[i].first_name} ${allDrivers[i].second_name}`, value: allDrivers[i].id})
    }
    return driversSelectData
}

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
    placeholder: defaultStyles => ({
        ...defaultStyles,
        margin: "0 0 20px 10px"
    }),
}

const OrdersElements = (orders) => {
    return (
        <div className='orders'>
            {orders.map((order, index) => (
                <div className='order'>
                    <div className='order__left-block'>
                        <img src={order.image || 'https://cdn-icons-png.flaticon.com/512/219/219986.png'} alt="#"/>
                        <p>{order.first_name} {order.second_name}</p>
                        <hr/>
                        <h3>{order.vehicle_number}</h3>
                    </div>
                    <div className="order__right-block">
                        <h3>ORDER STATUS: {order.status}</h3>
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
        </div>
    )
}

const OrdersWindow = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const ordersData = useSelector((state) => state.ordersReducer.allData)
    const amountOfOrders = useSelector((state) => state.ordersReducer.amountOfOrders)
    const limit = useSelector((state) => state.ordersReducer.limitFilter)
    const getAllDriversInfo = useSelector((state) => state.ordersReducer.allDrivers)


    let pageArray = []
    let pageAmount = Math.ceil(amountOfOrders/limit)
    let i=1

    const [statusId, setStatusId] = useState(2)
    const [amount, amountChanger] = useState(9)
    const [radio, changeRadio] = useState(1)
    const [driver, changeDriver] = useState(0)
    let [offset, offsetChanger] = useState(1)

    useEffect(()=> {
        dispatch(ChangeOffset(offset -1))
    }, [offset])

    useEffect(() => {
        if (statusId === 1) {
            changeDriver(0)
        }
        dispatch(ChangeStatus(statusId))
        offsetChanger(1)
    }, [statusId])

    useEffect(() => {
        dispatch(ChangeLimit(amount))
        offsetChanger(1)
    }, [amount])

    useEffect(() => {
        dispatch(ChangeDriverFilter(driver))
        offsetChanger(1)
    }, [driver])

    for (i; i <= pageAmount; i++) {
        if (i > 3 && pageAmount > 4) {
            pageArray[i] = {id: "..."}
            pageArray[i+1] = {id: pageAmount}
            break
        }
        pageArray[i] = {id: i}
    }

    if (ordersData.length < 1) {
        UseGetAllOrders()
    }

    return (
        <div className='board'>

            <div className='inputs'>
                <div className="inputs__select">
                    <CustomSelect onChange={(event) => setStatusId(event.value)}
                                  defaultValue={statuses[1]}
                                  isSearchable={false}
                                  styles={customStyles}
                                  options={statuses}
                    />

                    <CustomSelect onChange={(event) => changeDriver(event.value)}
                                  placeholder={statusId === 1 ? "Disable here" : "Drivers Filter"}
                                  isSearchable={false}
                                  styles={customStyles}
                                  options={allDriversNames(getAllDriversInfo)}
                                  isDisabled={statusId === 1}
                    />

                    <div onClick={(event) => {
                        changeRadio(1)
                        amountChanger(9)
                    }} className={`inputs__limiters ${radio === 1 ? "active" : "non-active"}`}>
                        <h3>9</h3>
                    </div>
                    <div onClick={(event) => {
                        changeRadio(2)
                        amountChanger(12)
                    }} className={`inputs__limiters ${radio === 2 ? "active" : "non-active"}`}>
                        <h3>12</h3>
                    </div>
                    <div onClick={(event) => {
                        changeRadio(3)
                        amountChanger(15)
                    }} className={`inputs__limiters ${radio === 3 ? "active" : "non-active"}`}>
                        <h3>15</h3>
                    </div>
                </div>
                <div onClick={() => {
                    dispatch(logOutUser())
                    history.push("/sign-in")
                }}
                     className='log-out'>
                    <img src={logOutIcon} alt="#"/>
                </div>
            </div>

            <div className="orders__wrapper">
                {OrdersElements(ordersData)}
            </div>

                <div className="paginator">
                    <i onClick={() => {offset !== 1 ? offsetChanger(offset -= 1) : false}}
                       className="paginator__arrow left"></i>
                    <div style={offset > 3 && offset < pageAmount - 2 && pageAmount > 6 ? {display: "inline-block"} : {display: "none"}}
                         className="paginator__counter">
                        <h3 onClick={() => {
                            offsetChanger(offset = 1)
                        }}>1</h3>
                        <h3 onClick={() => {
                            offsetChanger(offset -= 1)
                        }}>...</h3>
                        <h3 className={'active'}>{offset}</h3>
                        <h3 onClick={() => {
                            offsetChanger(offset += 1)
                        }}>...</h3>
                        <h3 onClick={() => {
                            offsetChanger(offset = pageAmount)
                        }}>{pageAmount}</h3>
                    </div>

                    <div style={offset <= 3 || pageAmount === 4 && offset === 4 ? {display: "inline-block"} : {display: "none"}}
                         className="paginator__counter">
                        {pageArray.map((page, index) => {
                            if (page.id === "...") {
                                return (
                                    <h3 onClick={() => {
                                        offsetChanger(offset +=1)
                                    }}
                                    >{page.id}</h3>
                                )
                            }
                            return (
                                <h3 className={offset === page.id ? "active" : ""}
                                    onClick={() => {
                                    offsetChanger(page.id)
                                }}
                                >{page.id}</h3>
                            )
                        })}
                    </div>

                    <div style={offset > 3 && offset >= pageAmount -2 && pageAmount >= 5 ? {display: "inline-block"} : {display: "none"}}
                         className="paginator__counter">
                        <h3 onClick={() => {
                            offsetChanger(offset = 1)
                        }}
                        >1</h3>
                        <h3 onClick={() => {
                            offsetChanger(offset -= 1)
                        }}
                        >...</h3>
                        <h3 className={offset === pageAmount - 2 ? "active" : false} onClick={() => {
                            offsetChanger(offset = pageAmount - 2)
                        }}
                        >{pageAmount - 2}</h3>
                        <h3 className={offset === pageAmount - 1 ? "active" : false} onClick={() => {
                            offsetChanger(offset = pageAmount - 1)
                        }}
                        >{pageAmount - 1}</h3>
                        <h3 className={offset === pageAmount ? "active" : false} onClick={() => {
                            offsetChanger(offset = pageAmount)
                        }}
                        >{pageAmount}</h3>
                    </div>
                    <i onClick={() => {offset !== pageAmount ? offsetChanger(offset += 1) : false}}
                       className="paginator__arrow right"></i>
                </div>

        </div>
    )
}

export default OrdersWindow;