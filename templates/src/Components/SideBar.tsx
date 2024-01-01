import styles from "./styles.module.css"
import { useDashBoardContext, AppContextType } from "../App";
const SideBar = () => {
    const { isDark, model, switchModel }: AppContextType = useDashBoardContext();

    return <section className={`${styles.sidebar} ${isDark ? styles.dark : styles.light}`}>
        <div className={styles.sidebar_children}>
            <button className={model == "ngram" ? styles.sidebar_active : ""} onClick={()=> switchModel!("ngram")}><div className={styles.sidebar_childern_model_svg}><SvgEl /></div><div className={styles.sidebar_childern_model_title} >N-Gram</div></button>
            <button className={model == "transformer" ? styles.sidebar_active : ""} onClick={()=>switchModel!("transformer")}><div className={styles.sidebar_childern_model_svg}><SvgEl /></div><div className={styles.sidebar_childern_model_title} >Transformer</div></button>
        </div>
        <div className={styles.sidebar_children}>
            <div>
                <div>
                    <a href="">
                        <span></span>
                        <span>Help Center</span>
                    </a>

                </div>
                <div>
                    <a href="">
                        <span></span>
                        <span>Contact Us</span>
                    </a>

                </div>
            </div>
            <div>
                v1.0.0
            </div>
        </div>
    </section>
}

export default SideBar



const SvgEl = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <g clipPath="url(#clip0_127_135)">
        <path d="M1.107 10.4582C0.799547 10.4582 0.579939 10.3528 0.448175 10.142C0.31641 9.93118 0.320802 9.67641 0.461351 9.37777L3.93994 1.66954C4.05413 1.41479 4.19029 1.23471 4.34841 1.1293C4.51531 1.01511 4.70417 0.958008 4.915 0.958008C5.11704 0.958008 5.29712 1.01511 5.45523 1.1293C5.62213 1.23471 5.76269 1.41479 5.87688 1.66954L9.36865 9.37777C9.50916 9.68526 9.51801 9.94436 9.395 10.1552C9.27202 10.3573 9.06119 10.4582 8.76253 10.4582C8.51657 10.4582 8.32331 10.4011 8.18276 10.287C8.051 10.1639 7.93241 9.97947 7.827 9.73354L7.16818 8.20507H2.63547L1.98982 9.73354C1.87563 9.98831 1.75704 10.1728 1.63406 10.287C1.51107 10.4011 1.33539 10.4582 1.107 10.4582ZM4.88865 2.89495L3.21523 6.86107H6.58841L4.915 2.89495H4.88865Z" fill="white" />
        <path d="M6.58838 12.7674L9.00854 15.0589L15.059 8.4707" stroke="white" strokeWidth="1.88235" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
        <clipPath id="clip0_127_135">
            <rect width="16" height="16" fill="white" />
        </clipPath>
    </defs>
</svg>