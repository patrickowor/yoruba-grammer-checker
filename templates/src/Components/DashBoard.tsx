import React from "react";


import Header from "./Header";
import SideBar from "./SideBar";
import Main from "./Main";
interface Props{
    
}

const DashBoard: React.FC = ({} : Props) => {
    
    return (<>
        <Header />
        <section style={{display : "flex", width : "100%", height : "91.6vh"}}>
            <SideBar />
            <Main />
        </section>
        <footer>

        </footer>
    </>);
}
export default DashBoard;
