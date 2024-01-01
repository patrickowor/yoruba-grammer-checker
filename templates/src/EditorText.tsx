// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {createEditor} from 'lexical';
import { useEffect } from 'react';
import {$getRoot, $getSelection, $createParagraphNode, $createTextNode, $setSelection } from 'lexical';
import { $insertParagraphNode } from '@lexical/rich-text';
const config = {
  namespace: 'MyEditor',
  theme: {
  },
  onError: console.error
};


const EditorTest = () => {
    const editor = createEditor(config);
    useEffect(()=> {
        const contentEditableElement = document.getElementById('editor');
        
        editor.setRootElement(contentEditableElement);
        const stringifiedEditorState = JSON.stringify(editor.getEditorState().toJSON());
        console.log(stringifiedEditorState)
        const newEditorState = editor.parseEditorState(stringifiedEditorState);
    }, [])

    return <>
    
    <div id="editor" contentEditable style={{width : '100px', height: '100px', border : '1px solid black', color : 'black'}}  onKeyUp={()=>{
        editor.update(() => {
            // Get the RootNode from the EditorState
            const root = $getRoot();
            
        
            // Get the selection from the EditorState
            const selection = $getSelection();
            const text = selection?.getTextContent()
            console.log(text)
            if (text) {
                selection?.insertText('1')
            }
            // Create a new ParagraphNode
            const paragraphNode = $createParagraphNode();
        
            // Create a new TextNode
            const textNode = $createTextNode('Hello world');
        
            // Append the text node to the paragraph
            paragraphNode.append(textNode);
        
            // Finally, append the paragraph to the root
            root.append(paragraphNode);
            const stringifiedEditorState = JSON.stringify(editor.getEditorState().toJSON());
        console.log(stringifiedEditorState)
        });
    }}></div>
    </>
}

export default EditorTest




// Inside the `editor.update` you can use special $ prefixed helper functions.
// These functions cannot be used outside the closure, and will error if you try.
// (If you're familiar with React, you can imagine these to be a bit like using a hook
// outside of a React function component).
