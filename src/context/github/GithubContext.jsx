import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({children})=>{

    const initialState = {
        users: [],
        user: {},
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

    // function to get users search results
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

    // function to get specific user
    const getUser = async (login)=>{
        setLoading()

        const response = await fetch(`${process.env.REACT_APP_GITHUB_API}/users/${login}`, {
            headers: {
                   Authorization:  `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        })

        if(response.status === 404){
            window.location('/notfound')
        }else{
            const data = await response.json()

        dispatch({
            type: "GET_USER",
            payload: data
        })
        }
        
    }

    const setLoading = ()=>dispatch({
            type: "SET_LOADING"
        })
    
    const clearUsers = ()=>{
        dispatch({
            type: "CLEAR_USERS"
        })
    }    

    return <GithubContext.Provider
        value={{
            users: state.users,
            loading: state.loading,
            user: state.user,
            searchUsers,
            clearUsers,
            getUser
        }}
    >
        {children}
    </GithubContext.Provider>
}

export default GithubContext;