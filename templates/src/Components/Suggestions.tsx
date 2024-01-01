import NoScrollMapSvg from './NoScrollMap.svg'
import { useDashBoardContext, AppContextType } from "../App";
import { useEffect, useState } from 'react';
import axios from 'axios';


type sentencesDicttype = {
    index : string[],
    sentences : string[]
}

export default function Suggestions({selected, setUpdateText} : { selected : (e : any)=> void, setUpdateText : (e : any)=> void}){
    const {isDark,  text :sentences } : AppContextType  = useDashBoardContext();
    const [sentencesDict, setSentencesDict ] = useState<sentencesDicttype>({'index' :[], 'sentences' : [] })
    const [predictions, setPredictions ] = useState<string[]>([])
    useEffect(()=> {
        sentences // just to make sure
         var sentence_arr = []
         var index_arr = []
         for(var i in sentences){
             var split = sentences[parseInt(i)].split(' ')
             if (split.length >= 3){
                 for (var j = 3 ; j <= split.length; j++){
                    if (split[j-1].trim() !== ''){
                     sentence_arr.push(`${split[j-3]} ${split[j-2]} ${split[j-1]}`)
                     index_arr.push(i)          
                    }

                }
             }

         }
         if (sentencesDict['sentences'][sentencesDict['index'].length -1] !== sentence_arr[index_arr.length -1]  ){
            setSentencesDict({'index' :index_arr, 'sentences' : sentence_arr })
         }
     }, [sentences])

    useEffect(() => {
        if (sentencesDict["sentences"][sentencesDict["sentences"].length -1] != undefined){
            var text = sentencesDict["sentences"][sentencesDict["sentences"].length -1]
            axios.post('http://127.0.0.1:4000/',{"text" :  text}).then(resp => {
                if (resp.data.error === undefined){
                    setPredictions(resp.data.message) 
                } else {
                    alert(resp.data.error)
                }
            })            
        }

    }, [sentencesDict])


    useEffect(()=> {
        selected(predictions.length)
    }, [predictions])

    const useSelection = (value : any) => {
        setUpdateText(value)
        setPredictions([])
    }


    var dark = isDark ?? false
    var sentenceLength = sentences?.length ?? 0;
    return <>
        {(sentenceLength > 0 ) ? 
           <div style={{display : "flex", flexDirection : 'column', backgroundColor : 'transparent', width : '100%', height : '400px', overflowY : 'scroll'}}>
             { predictions.map((value, i) => {
                return <div key={`prediction-${i}`} style={{backgroundColor : dark ? '#191A1C' : '#FFF5E1', padding : '5px', marginBottom : '5px', color : dark ? 'white' : 'black' }} onClick={() => useSelection(value)}>{value}</div>
            })}
           </div>
        :
        <img src={NoScrollMapSvg} alt="no suggestion" />
        }
        
    </>
}