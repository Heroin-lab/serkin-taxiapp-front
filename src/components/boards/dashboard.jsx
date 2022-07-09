import React from "react";
import '../../styles/dashboard.scss'
import {useDispatch, useSelector} from "react-redux";
import {getDashInfo} from "../../store/reducers/dashboard";

const DashboardWindow = () => {
    const dispatch = useDispatch()
    dispatch(getDashInfo())

    const created = useSelector((state) => state.dashReducer.created)
    const inProgress = useSelector((state) => state.dashReducer.inProgress)
    const done = useSelector((state) => state.dashReducer.done)
    const total = useSelector((state) => state.dashReducer.total)


    return (
        <div className='board'>
            <div className='card'>
                <h2>Created: {created}</h2>
                <h2>In progress: {inProgress}</h2>
                <h2>Done: {done}</h2>
                <h1>Total: {total}</h1>
            </div>
        </div>
    )
}

export default DashboardWindow;