import '../../styles/auth.scss'

import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createErrorAlert, loginAsync, registerAsync, validator} from "../../store/reducers/auth";

const SignUpWindow = () => {
    const alertMsg = useSelector((state) => state.authReducer.alertError)
    const history = useHistory()
    const dispatch = useDispatch()

    const collector = () => {
        let credObj = {
            login: document.getElementById("loginInput").value,
            password: document.getElementById("passwordInput").value,
            confirm: document.getElementById("confirmPasswordInput").value
        }

        if (credObj.password !== credObj.confirm) {
            dispatch(createErrorAlert("Passwords don't match!"))
            return false
        }

        return {login: credObj.login, password: credObj.password}
    }

    const tryRegister = async () => {
        let fieldData = collector()

        if (!fieldData) {
            return
        }

        if (!dispatch(validator(fieldData))) {
            return
        }

        if (await dispatch(registerAsync(fieldData))) {
            history.push("/sign-in")
            dispatch(createErrorAlert(""))
        }
    }

    return (
        <div className='auth'>
            <div className='auth__window'>
                <h1>SIGN UP</h1>
                <div className='auth__window_inputs'>
                    <input id='loginInput' type="text" placeholder='LOGIN'/>
                    <input id='passwordInput' type="password" placeholder='PASSWORD'/>
                    <input id='confirmPasswordInput' type="password" placeholder='CONFIRM PASSWORD'/>
                </div>
                <input
                    className='window__button' type="button" value="SIGN UP"
                    onClick={() => tryRegister()}
                />
                <div className='under-text'>
                    <p className='under-text__paragraph'>Already have an account?</p>
                    <Link to='/sign-in'>
                        <p className='under-text__href'>Sign in</p>
                    </Link>
                </div>
                <p className='auth__window_alerter'>{alertMsg}</p>
            </div>
        </div>
    )
}

export default SignUpWindow;