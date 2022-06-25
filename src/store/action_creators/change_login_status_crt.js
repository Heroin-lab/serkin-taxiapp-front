import CHANGE_LOGIN_STATUS from "../actions/change_login_status";


function changeLoginStatus(value) {
    return {
        type: CHANGE_LOGIN_STATUS,
        value: value
    }
}

export default changeLoginStatus