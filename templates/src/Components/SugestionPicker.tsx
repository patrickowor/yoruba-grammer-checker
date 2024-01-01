// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {$getRoot, $getSelection, $createParagraphNode, $createTextNode, $setSelection, $getPreviousSelection,  } from 'lexical';




export default function SuggestionUpdater({ updateText, setUpdateText} : { updateText : any, setUpdateText : () => void }) {
    const [editor] = useLexicalComposerContext();

    useEffect(()=>{
        if (updateText !== null){
            

            editor.update(()=> {
                var textNode = $getRoot().getAllTextNodes()[ $getRoot().getAllTextNodes().length -1]
                var text = textNode.getTextContent().trim().split(' ')
                textNode.setTextContent( text.slice(0, text.length -3 ).join(' ') +' '+ updateText)
                $getRoot().getLastChild()?.selectEnd();
                setUpdateText()
            })
            editor.focus()
        }
    }, [updateText])
    return <></>
}