import '../../styles/main_bg.scss'

import SignInWindow from "../Auth/sign-in_comp";
import SignUpWindow from "../Auth/sign-up-comp";

import {useLocation} from "react-router-dom";

const MainBg = () => {
    const location = useLocation()

    let window

    if (location.pathname === "/sign-in") {
        window = <SignInWindow/>
    } else if (location.pathname) {
        window = <SignUpWindow/>
    }

    return (
        <main className='main'>
            {window}

            <div className='main__blur'></div>
        </main>
    )
}

export default MainBg;