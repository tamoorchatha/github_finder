import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({children})=>{

    const initialState = {
        users: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

    const fetchUsers = async ()=>{
        setLoading()
        const response = await fetch(`${process.env.REACT_APP_GITHUB_API}/users`, {
            headers: {
                   Authorization:  `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        })
        const data = await response.json()

        dispatch({
            type: "GET_USERS",
            payload: data
        })
    }

    const setLoading = ()=>dispatch({
            type: "SET_LOADING"
        })
    

    return <GithubContext.Provider
        value={{
            users: state.users,
            loading: state.loading,
            fetchUsers
        }}
    >
        {children}
    </GithubContext.Provider>
}

export default GithubContext;