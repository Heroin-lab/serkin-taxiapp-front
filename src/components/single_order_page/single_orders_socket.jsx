import {useState, useEffect} from "react";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {setFILO} from "../../store/reducers/single_order";

const WebSocketHistoryRows = (props) => {
    const dispatch = useDispatch()

    const [messageHistory, setMessageHistory] = useState([]);

    const socketUrl = 'ws://localhost:7777/ws/socket';

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        socketUrl,
    );

    useEffect(() => {
        if (lastJsonMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastJsonMessage));
            dispatch(setFILO(lastJsonMessage))
        }
    }, [lastJsonMessage, setMessageHistory]);


    const handleClickSendMessage = useCallback(
        () =>
            sendJsonMessage({id: props.id}),
        [sendJsonMessage],
    );

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    handleClickSendMessage()

    return (
        <div>
            {}
        </div>
    )
}

export default WebSocketHistoryRows;