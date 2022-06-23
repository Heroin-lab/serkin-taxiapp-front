import '../../styles/auth.scss'

import { Link } from "react-router-dom";

const SignUpWindow = () => {
    return (
        <div className='auth'>
            <div className='auth__window'>
                <h1>SIGN UP</h1>
                <div className='auth__window_inputs'>
                    <input type="text" placeholder='LOGIN'/>
                    <input type="password" placeholder='PASSWORD'/>
                    <input type="password" placeholder='CONFIRM PASSWORD'/>
                </div>
                <input className='window__button' type="button" value="SIGN UP"/>
                <div className='under-text'>
                    <p className='under-text__paragraph'>Already have an account?</p>
                    <Link to='/sign-in'>
                        <p className='under-text__href'>Sign in</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUpWindow;