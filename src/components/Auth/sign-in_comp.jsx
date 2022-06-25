import '../../styles/auth.scss'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginAsync, logInUser} from "../../store/reducers/auth";


const SignInWindow = () => {
    const status = useSelector((state) => state.authReducer.value)
    const dispatch = useDispatch()

    return (
        <div className='auth'>
            <div className='auth__window'>
                <h1>FIRST YOU NEED TO LOGIN {status}</h1>
                <div className='auth__window_inputs'>
                    <input type="text" placeholder='LOGIN'/>
                    <input type="password" placeholder='PASSWORD'/>
                </div>
                <input
                    className='window__button' type="button" value="SIGN IN"
                    onClick={() => dispatch(loginAsync(Number(loginAsync) || 0))}
                />
                <div className='under-text'>
                    <p className='under-text__paragraph'>Already have an account?</p>
                    <Link to='sign-up'>
                        <p className='under-text__href'>Sign up</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignInWindow;