import '../../styles/auth.scss'
import {useDispatch, useSelector} from "react-redux";
import {loginAsync, validator} from "../../store/reducers/auth";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";


const SignInWindow = () => {
    const alertMsg = useSelector((state) => state.authReducer.alertError)
    const history = useHistory()
    const dispatch = useDispatch()

    const collector = () => {
        return {
            login: document.getElementById("loginInput").value,
            password: document.getElementById("passwordInput").value,
        }
    }

    const tryLogin = async () => {
        let fieldData = collector()

        if (!dispatch(validator(fieldData))) {
            return
        }

        if (await dispatch(loginAsync(fieldData))) {
            history.push("/dashboard")
        }
    }

    return (
        <div className='auth'>
            <div className='auth__window'>
                <h1>FIRST YOU NEED TO LOGIN</h1>
                <div className='auth__window_inputs'>
                    <input id='loginInput' type="text" placeholder='LOGIN'/>
                    <input id='passwordInput' type="password" placeholder='PASSWORD'/>
                </div>
                <input
                    className='window__button' type="button" value="SIGN IN"
                    onClick={() => tryLogin()}
                />
                <div className='under-text'>
                    <p className='under-text__paragraph'>Already have an account?</p>
                    <Link to='sign-up'>
                        <p className='under-text__href'>Sign up</p>
                    </Link>
                </div>
                <p className='auth__window_alerter'>{alertMsg}</p>
            </div>
        </div>
    )
}

export default SignInWindow;