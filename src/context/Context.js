import React, {useState, useContext, createContext} from "react";

const PracticeContext = React.createContext();

const PracticeProvider = ({children}) =>{
  const [val, setVal] = useState([]);

  return(
    <PracticeContext.Provider value={{val,setVal}}>
      {children}
    </PracticeContext.Provider>
  )
}

export {PracticeContext, PracticeProvider}; 