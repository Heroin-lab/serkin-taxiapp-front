import React, {useEffect, useState} from "react";
import Popup from 'reactjs-popup';

import logOutIcon from '../../assets/log-out-icon.png'
import plusIcon from '../../assets/plus-icon.png'
import editIcon from '../../assets/edit-icon.png'
import deleteIcon from '../../assets/delete-icon.png'

import '../../styles/orders.scss'
import '../../styles/cabmans.scss'
import '../../styles/auth.scss'
import {useDispatch, useSelector} from "react-redux";
import {
    clearAlertMessage, CreateCabMan, DeleteCanMan,
    EditValidator,
    LoadAllDriversInfo,
    UpdateCabMan
} from "../../store/reducers/drivers";
import {logOutUser} from "../../store/reducers/auth";
import {useHistory} from "react-router-dom";


const CabMansWindow = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    let [update, callUpdate] = useState(0)
    const [oneCabManInfo, setOneCabManInfo] = useState({
        id: 0,
        first_name: "",
        second_name: "",
        vehicle_number: "",
        image: "",
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setOneCabManInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const cabManInfoSetter = (id) => {
        for (let i=0; i < allDriversInfo.length; i++) {
            if (allDriversInfo[i].id == id) {
                setOneCabManInfo(allDriversInfo[i])
                break
            }
        }
    }

    const clearAllOneCabManData = () => {
        setOneCabManInfo({})
        dispatch(clearAlertMessage())
    }

    useEffect(() => {
        dispatch(LoadAllDriversInfo(history))
    }, [update])

    const allDriversInfo = useSelector((state) => state.driversReducer.allDriverInfo)
    const alertMsg = useSelector(state => state.driversReducer.alertMessage)

    return (
        <div className='board'>
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

            <div className="drivers-cards">
                {allDriversInfo.map((card, index) => (
                    <div className="drivers-cards__card">
                        <div className="drivers-cards__card_wrapper">
                            <img src={card.image} alt="#"/>
                            <div className="drivers-cards__card_creds">
                                <p>{card.first_name}</p>
                                <p>{card.second_name}</p>
                            </div>
                            <hr/>
                            <h3>{card.vehicle_number}</h3>
                        </div>

                        <div className="drivers-cards__card_actions">
                            <div className="wrapper">
                                <div className="edit">
                                    <Popup onOpen={event => cabManInfoSetter(event.target.value)}
                                           onClose={() => clearAllOneCabManData()}
                                           trigger={
                                                <button value={card.id}>
                                                    <img src={editIcon} alt="#"></img>
                                                </button>
                                    } modal>
                                        {close => (
                                            <div className="modal">
                                                <div className="modal__wrapper">
                                                    <a className="modal__close-button" onClick={() => {
                                                        clearAllOneCabManData()
                                                        close()
                                                    }}>
                                                        &times;
                                                    </a>
                                                    <img src={oneCabManInfo.image} alt="#"/>
                                                    <div className="modal__inputs">
                                                        <label htmlFor="firstNameInput">First name:</label>
                                                        <input defaultValue={oneCabManInfo.first_name}
                                                               onChange={(event) => handleChange(event)}
                                                               id="firstNameInput"
                                                               placeholder="First name"
                                                               type="text"
                                                               name="first_name"
                                                        />

                                                        <label htmlFor="secondNameInput">Second name:</label>
                                                        <input defaultValue={oneCabManInfo.second_name}
                                                               onChange={(event) => handleChange(event)}
                                                               id="secondNameInput"
                                                               placeholder="Second name"
                                                               type="text"
                                                               name="second_name"
                                                        />

                                                        <label htmlFor="vehicleNumber">Vehicle number:</label>
                                                        <input defaultValue={oneCabManInfo.vehicle_number}
                                                               onInput={(event) => event.target.value = event.target.value.toUpperCase()}
                                                               onChange={(event) => handleChange(event)}
                                                               id="vehicleNumber"
                                                               placeholder="Vehicle number"
                                                               type="text"
                                                               name="vehicle_number"
                                                               maxLength="10"
                                                        />
                                                    </div>
                                                    <input onClick={() => {
                                                        dispatch(EditValidator(oneCabManInfo)) ? dispatch(UpdateCabMan(oneCabManInfo, history)) ? close() : false : false
                                                        callUpdate(update += 1)
                                                    }}
                                                       defaultValue="Confirm edit"
                                                       type="button"
                                                       className="window__button"
                                                    />
                                                    <p className="modal__alerter">{alertMsg}</p>
                                                </div>
                                            </div>
                                        )}
                                    </Popup>
                                </div>
                                <div onClick={(event) => console.log(event.target.value)} className="delete">
                                    <Popup onOpen={event => cabManInfoSetter(event.target.value)}
                                           onClose={() => clearAllOneCabManData()}
                                           trigger={
                                        <button value={card.id}>
                                            <img src={deleteIcon} alt="#"></img>
                                        </button>}
                                           modal>
                                        {close => (
                                            <div className="modal">
                                                <div className="modal__wrapper">
                                                    <a className="modal__close-button" onClick={close}>
                                                        &times;
                                                    </a>

                                                    <h1>Are you sure about that?</h1>
                                                    <h1>This action cannot be undone!</h1>

                                                    <div className="delete-btns">
                                                        <input onClick={async () => {
                                                            if (await dispatch(DeleteCanMan(oneCabManInfo.id, history))) {
                                                                callUpdate(update += 1)
                                                                close()
                                                            }
                                                        }}
                                                               defaultValue="Confirm delete"
                                                               type="button"
                                                               className="delete-btns__btn"
                                                        />

                                                        <input onClick={close}
                                                               defaultValue="Cancel"
                                                               type="button"
                                                               className="delete-btns__btn"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Popup>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="drivers-cards__card">
                    <Popup onOpen={event => cabManInfoSetter(event.target.value)}
                           onClose={() => clearAllOneCabManData()}
                           trigger={
                                <div className="drivers-cards__card_plus">
                                    <img src={plusIcon} alt="#"></img>
                                </div>
                           } modal>
                        {close => (
                            <div className="modal">
                                <div className="modal__wrapper">
                                    <a className="modal__close-button" onClick={() => {
                                        clearAllOneCabManData()
                                        close()
                                    }}>
                                        &times;
                                    </a>
                                    <img src="https://cdn-icons-png.flaticon.com/512/219/219986.png" alt="#"/>
                                    <div className="modal__inputs">
                                        <label htmlFor="firstNameInput">First name:</label>
                                        <input onChange={(event) => handleChange(event)}
                                               id="firstNameInput"
                                               placeholder="First name"
                                               type="text"
                                               name="first_name"
                                        />

                                        <label htmlFor="secondNameInput">Second name:</label>
                                        <input onChange={(event) => handleChange(event)}
                                               id="secondNameInput"
                                               placeholder="Second name"
                                               type="text"
                                               name="second_name"
                                        />

                                        <label htmlFor="vehicleNumber">Vehicle number:</label>
                                        <input onInput={(event) => event.target.value = event.target.value.toUpperCase()}
                                               onChange={(event) => handleChange(event)}
                                               id="vehicleNumber"
                                               placeholder="Vehicle number"
                                               type="text"
                                               name="vehicle_number"
                                               maxLength="10"
                                        />
                                    </div>
                                    <input onClick={async () => {
                                        await dispatch(EditValidator(oneCabManInfo)) ? dispatch(CreateCabMan(oneCabManInfo, history)) ? close() : false : false
                                        callUpdate(update += 1)
                                    }}
                                           defaultValue="Create"
                                           type="button"
                                           className="window__button"
                                    />
                                    <p className="modal__alerter">{alertMsg}</p>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
            </div>
        </div>
    )
}

export default CabMansWindow;