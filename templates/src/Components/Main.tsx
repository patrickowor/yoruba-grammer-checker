import styles from "./styles.module.css"
import { useDashBoardContext, AppContextType } from "../App";
import Editor from './Editor'
import { useState, useEffect } from "react";
import Suggestions from "./Suggestions";

const Main =() => {
    const { isDark , text :sentences } : AppContextType  = useDashBoardContext();
    const [totalWords, setTotalWords] = useState<any>(0);
    const [totalCorrections, setTotalCorrections] = useState<any>(0);
    const [updateText, setUpdateText] = useState<any>(null);

    const countWords = (sentence : String) => {
        const words = sentence.split(" ").filter((word) => word.trim() !== "");
        return words.length;
      };
    useEffect(() => {
    const totalWords = sentences?.reduce((acc, sentence) => {
        return acc + countWords(sentence);
    }, 0);

    setTotalWords(totalWords);
    }, [sentences]);


    return <main className={styles.main}>
        <nav className={`${styles.nav} ${isDark ? styles.dark : styles.light}`}>
            <span className={styles.underline}>English (US)</span>
            <span>Yorùbá</span>
        </nav>
        <section style={{display : "flex", justifyContent : "flex-start"}} >
            <section style={{width : "60%"}}>
                <Editor updateText={updateText} setUpdateText={() => setUpdateText(null)}> 
                    <div className={`${styles.editorFooter} ${isDark ? styles.dark : styles.light}`}>
                        <div className={` ${isDark ? styles.editorFooterChildDark : styles.editorFooterChildLight}`}> 
                            <div><span style={{
                                background : "#d6d8dd5b",
                                padding: "5px",
                                paddingBlock : "2px",
                                borderRadius: "5px"
                            }}  >{totalCorrections > 0 ? `${totalCorrections} suggestions` : "no errors"} </span></div>
                            <div style={{borderLeft : "solid 2px #d6d8dd5b", paddingLeft : "10px"}}>{totalWords} words</div>
                        </div>
                    </div>
                </Editor>
            </section>
            
            <section   style={{width : "40%", marginTop : "30px"}}>
                <div className={styles.rightSidebarOptions}  >
                    <div className={styles.suggestionOptionsHeading} style={{marginLeft : "10px"}}><span>All</span> <CheckSvg /></div>
                    <div className={styles.suggestionOptionsHeading} ><span>Grammer</span><CheckSvg /></div>
                    <div className={styles.suggestionOptionsHeading} ><span>Sentence suggestion </span><CheckSvg /></div>
                </div>
                <div style={{width : "100%", height : '100%', display : "flex", justifyContent : "center", alignItems : "center"}}>
                    <Suggestions  selected={(e: any) => setTotalCorrections(e)} setUpdateText={(e : any) => setUpdateText(e)} />
                </div>
            </section>
        </section>
        

    </main>
} 

export default Main



var CheckSvg = () => <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
<g clipPath="url(#clip0_222_18)">
<path fillRule="evenodd" clipRule="evenodd" d="M7.74989 13.9661C3.93507 13.9661 0.783691 10.8147 0.783691 6.99989C0.783691 3.18507 3.92972 0.0336914 7.74454 0.0336914C11.5594 0.0336914 14.7161 3.18507 14.7161 6.99989C14.7161 10.8147 11.5647 13.9661 7.74989 13.9661ZM6.89385 10.499C7.09181 10.499 7.26303 10.4081 7.39144 10.2101L10.9869 4.57617C11.0672 4.45846 11.1367 4.314 11.1367 4.18559C11.1367 3.90202 10.8852 3.72546 10.6231 3.72546C10.4679 3.72546 10.3127 3.81641 10.195 3.99833L6.8671 9.28986L5.09612 7.06945C4.95701 6.89289 4.81255 6.82868 4.64134 6.82868C4.37917 6.82868 4.1598 7.03735 4.1598 7.32092C4.1598 7.45468 4.21331 7.59914 4.30426 7.7115L6.36951 10.2155C6.53537 10.4188 6.69588 10.499 6.89385 10.499Z" fill="#038851"/>
</g>
<defs>
<clipPath id="clip0_222_18">
<rect width="13.9324" height="13.9324" fill="white" transform="translate(0.783691 0.0336914)"/>
</clipPath>
</defs>
</svg>




