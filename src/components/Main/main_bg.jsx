import '../../styles/main_bg.scss'

import SignInWindow from "../Auth/sign-in_comp";
import SignUpWindow from "../Auth/sign-up_comp";
import OrdersWindow from "../boards/orders";
import DashboardWindow from "../boards/dashboard";
import CabMansWindow from "../boards/cabmans";


import {useRouteMatch, Route, Switch} from "react-router-dom";
import SingleOrder from "../single_order_page/single_order";

const MainBg = () => {
    let match = useRouteMatch();


    return (
        <main className='main'>
            <Switch>
                <Route path={'/sign-in'}>
                    <SignInWindow/>
                </Route>

                <Route path={'/sign-up'}>
                    <SignUpWindow/>
                </Route>

                <Route path={'/dashboard'}>
                    <DashboardWindow/>
                </Route>

                <Route path={'/orders'}>
                    <Switch>
                        <Route path={`${match.path}/:orderId`}>
                            <SingleOrder/>
                        </Route>
                        <Route path={`${match.path}`}>
                            <OrdersWindow/>
                        </Route>
                    </Switch>
                </Route>

                <Route path={'/cab-mans'}>
                    <CabMansWindow/>
                </Route>
            </Switch>
        </main>
    )
}

export default MainBg;