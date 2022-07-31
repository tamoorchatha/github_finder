import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({children})=>{

    const initialState = {
        users: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

    const searchUsers = async (text)=>{
        setLoading()

        const params = new URLSearchParams({
            q: text
        })
        const response = await fetch(`${process.env.REACT_APP_GITHUB_API}/search/users?${params}`, {
            headers: {
                   Authorization:  `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        })
        const {items} = await response.json()

        dispatch({
            type: "GET_USERS",
            payload: items
        })
    }

    const setLoading = ()=>dispatch({
            type: "SET_LOADING"
        })
    

    return <GithubContext.Provider
        value={{
            users: state.users,
            loading: state.loading,
            searchUsers
        }}
    >
        {children}
    </GithubContext.Provider>
}

export default GithubContext;