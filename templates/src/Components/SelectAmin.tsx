// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useDashBoardContext, AppContextType } from "../App";
import {$getRoot, $getSelection, $createParagraphNode, $createTextNode, $setSelection } from 'lexical';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import "./editor.css";

import Select from 'react-select'



const AminSelector = () =>{
    const { showAmin, setShowAmin, showAminList , text, setText}: AppContextType = useDashBoardContext();
    const [editor] = useLexicalComposerContext();
    var position = (()=>{ var el = document.getElementById('amin-button');
    var rect = el?.getBoundingClientRect();
    return rect})();

    return(  <>
        {showAmin &&  <div style={{     
            position : "fixed",
            zIndex : 100,
            width : '70px',
            top: `${position.top + 5}px`, 
            left: `${position.left}px`}} ><Select className="toolbar-item" name="amin" id="amin" style={{
            backgroundColor : "white"
        }} placeholder='à'  onChange={(e)=> {
            editor.update(()=> {
                const selection = $getSelection();
                const t = selection?.getTextContent()
                if (t){
                    selection?.insertText(e.value)
                    setText!(editor.getRootElement()?.children)
                }
            })
            setShowAmin(false)
        }}  options={ showAminList?.map((v, i)=>{ return {"value" : v, label : v }})  }>

        {/* {showAminList?.map((value, i)=> <Option key={'amin-' + i} value={value}>{value}</Option>)} */}
    </Select> </div>}
    </>)
}

export default AminSelector

export function useonclickAminButton(editor : any, {showAmin, setShowAmin, showAminList, setShowAminList} : {showAmin : any, setShowAmin : any, showAminList : any, setShowAminList : any},) {
    var specialChar = {'a': ['a', 'à', 'á'], 'à': ['a', 'à', 'á'], 'á': ['a', 'à', 'á'], 'é': ['é', 
    'ẹ̀', 'e', 'è', 'ẹ', 'ẹ́'], 'ẹ̀': ['é', 'ẹ̀', 'e', 'è', 'ẹ', 'ẹ́'], 'e': ['é','ẹ̀', 'e', 'è', 'ẹ', 'ẹ́'], 'è': ['é', 'ẹ̀', 'e', 'è', 'ẹ', 'ẹ́'], 'ẹ': ['é','ẹ̀', 'e', 'è', 'ẹ', 'ẹ́'], 'ẹ́': ['é', 'ẹ̀', 'e', 'è', 'ẹ', 'ẹ́'], 'í': ['í', 'i', 'ì'], 'i': ['í', 'i', 'ì'], 'ì': ['í', 'i', 'ì'], 'n': ['n', 'ǹ', 'ń'], 'ǹ': ['n', 'ǹ', 'ń'], 'ń': ['n', 'ǹ', 'ń'], 's': ['s', 'ṣ'], 'ṣ': ['s', 'ṣ'], 'u': ['u', 'ú', 'ù'], 'ú': ['u', 'ú', 'ù'], 'ù': ['u', 'ú', 'ù'], 'ó': ['ó', 'ọ́', 'o', 'ọ', 'ò', 'ọ̀'], 'ọ́': ['ó', 'ọ́', 'o', 'ọ', 'ò', 'ọ̀'], 'o': ['ó', 'ọ́', 'o', 'ọ', 'ò', 'ọ̀'], 'ọ': ['ó', 'ọ́', 'o', 'ọ', 'ò', 'ọ̀'], 'ọ̀': ['ó', 'ọ́', 'o', 'ọ', 'ò', 'ọ̀']
    }
    editor.update(() => {
        const selection = $getSelection();
        const text = selection?.getTextContent()
        if (text){
            if (text.length === 1 ) {
                if (text in specialChar){
                    setShowAminList(specialChar[text])
                    setShowAmin(true)
                }else {
                    setShowAmin(false)
                }
            } else {

            }
        }
    })

    // if (text) {
    //     
    // }
}

