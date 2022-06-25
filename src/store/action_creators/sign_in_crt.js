import SIGN_IN from "../actions/sing_in";

function signIn(value) {
    return{
        type: SIGN_IN,
        value: value
    }
}

export default signIn;