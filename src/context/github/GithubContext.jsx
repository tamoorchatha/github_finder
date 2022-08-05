import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({children})=>{

    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

    // function to get users search results
    
    
    const clearUsers = ()=>{
        dispatch({
            type: "CLEAR_USERS"
        })
    }    

    return <GithubContext.Provider
        value={{
            ...state,
            dispatch,
            clearUsers,
        }}
    >
        {children}
    </GithubContext.Provider>
}

export default GithubContext;