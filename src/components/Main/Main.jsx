import '../../styles/main.scss';
import NavBar from "./navigation_bar";
import MainBg from "./main_bg";


function Main() {
    return (
        <div className="home">
            <NavBar />
            <MainBg />
        </div>
    );
}

export default Main;