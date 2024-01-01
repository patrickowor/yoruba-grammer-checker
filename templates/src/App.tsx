import{ createContext, useState, useContext } from 'react'
// import styles from './App.module.css'
import DashBoard from './Components/DashBoard';

export type AppContextType = {
  isDark? : boolean,
  switchDarkMode? : () => void,
  model? : string,
  switchModel? : (modelName: string) => void,
  text? : string[],
  setText? : (data : any) => void,
  showAmin? : boolean,
  setShowAmin? : (show : any) => void  ,
  showAminList? : string[],
  setShowAminList? : (show : string[]) => void  
}


const AppContext  = createContext <AppContextType> ({});

function App() {
  let [isDark, setterIsDark] = useState(false);
  let [model, setModel] = useState("ngram")
  let [text, _setText] = useState<string[]>([])
  let [showAmin, _setshowAmin] = useState(false)
  let [showAminList, _setshowAminList] = useState<string[]>([])

  const setShowAminList = (data : string[]) => _setshowAminList(data)
  const switchDarkMode = () => setterIsDark((mode) => !mode )
  const switchModel = (modelName : string) => setModel(modelName )
  const setText = (data : any) => {
    var arr = []
     for(var i of data) {
      if (i.textContent.length > 0){
        arr.push(i.textContent)
      }
     }
     _setText(arr)
    }

  const setShowAmin = (show : any) => {
    _setshowAmin(show)
  }
  return (
    <AppContext.Provider value={{isDark, switchDarkMode, model, switchModel, text, setText,showAmin, setShowAmin, showAminList, setShowAminList}}>
     { isDark ?<style>{`
        body {
          background : #323436;
        }
     
     `}</style> : <></>}
        <DashBoard />
    </AppContext.Provider>

  )
}

export default App


export function useDashBoardContext(){
    let context : AppContextType  = useContext(AppContext)
    if (Object.keys(context).length == 0) return {isDark : undefined ,switchDarkMode : undefined,   model : undefined, switchModel : undefined,text : undefined, setText :undefined , showAmin : false , setShowAmin : undefined, showAminList : undefined, setShowAminList : undefined};
    else return context;
}