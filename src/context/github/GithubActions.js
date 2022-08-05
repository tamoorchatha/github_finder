
// the function to get users
export const searchUsers = async (text)=>{

    const params = new URLSearchParams({
        q: text
    })
    const response = await fetch(`${process.env.REACT_APP_GITHUB_API}/search/users?${params}`, {
        headers: {
               Authorization:  `token ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
    })
    const {items} = await response.json()

    return items;
}

// function to get specific user
export const getUser = async (login)=>{

    const response = await fetch(`${process.env.REACT_APP_GITHUB_API}/users/${login}`, {
        headers: {
               Authorization:  `token ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
    })

    if(response.status === 404){
        window.location('/notfound')
    }else{
        const data = await response.json()
        return data
    }
    
}

export const getRepos = async (login)=>{


    const params = new URLSearchParams({
        sort: "created",
        per_page: 10,
    })

    const response = await fetch(`${process.env.REACT_APP_GITHUB_API}/users/${login}/repos?${params}`, {
        headers: {
               Authorization:  `token ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
    })

    
        const data = await response.json()
        return data
    
}


    