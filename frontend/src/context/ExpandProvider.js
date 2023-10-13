import { createContext,useContext,useState } from "react";

const ExpandContext = createContext();

export const useExpand = () => {
    return useContext(ExpandContext);    
}

export const ExpandProvider = ({children}) => {
    const [expand,setExpand] = useState(true);
    return (
        <ExpandContext.Provider value = {{expand,setExpand}}>
            {children}
        </ExpandContext.Provider>
    )
}