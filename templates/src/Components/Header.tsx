import styles from "./styles.module.css"
import { useDashBoardContext, AppContextType } from "../App";
const Header = () => {
    const { isDark,  switchDarkMode  } : AppContextType  = useDashBoardContext();
    return <main className={styles.header_bg}>
        <div className={styles.header_logo_div}>
            <div ><OptionSvg /></div>
            <span>Yorùbá</span>
            <span>Fix</span>
        </div>
        <div className={styles.header_title}> Grammer checker</div>
        <div className={styles.header_options_div}>
            <div><img src="./src/assets/ng.png" alt="NG" width={20} height={20} /></div>
            <div><img src="./src/assets/US.jpg" alt="ENG" width={20} height={20} /></div>
            <div style={{ backgroundColor: isDark ? "" :"whitesmoke", borderRadius: "50%", width: "18px", height: "18px", marginTop: "3px", border : isDark ? "solid 0.5px whitesmoke" : "" }}
            onClick={switchDarkMode!}
            ><img src="./src/assets/DM.png" alt="DM" width={15} height={15} /></div>
            <div ><img style={{ borderRadius: "50%", paddingBottom: "3px" }} src="./src/assets/User.jpg" alt="USER" width={20} height={20} /></div>
        </div>
    </main>
}


export default Header


const OptionSvg = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="10" viewBox="0 0 24 10" fill="none">
    <mask id="mask0_127_31" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="10">
        <rect width="24" height="10" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_127_31)">
        <path d="M3 9.01418V7.4999H21V9.01418H3ZM3 5.22847V3.71418H21V5.22847H3ZM3 1.44275V-0.0715332H21V1.44275H3Z" fill="#1C1B1F" />
    </g>
</svg>