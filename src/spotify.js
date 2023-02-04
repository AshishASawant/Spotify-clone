import axios from 'axios'
// const client_id = process.env.REACT_APP_CLIENT_ID; // client id ---hosted app 
// const redirect_uri = 'https://tseries.netlify.app'; //  redirect uri ---hosted app
const client_id = process.env.REACT_APP_CLIENT_ID2; // client id ---devlopment app 
const redirect_uri = 'http://localhost:3000'; //  redirect uri ---development app
const authEndpoint='https://accounts.spotify.com/authorize?'
const scopes=['user-library-read','playlist-read-private']

export const loginEndpoint=`${authEndpoint}client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
 
const apiClient=axios.create({
    baseURL:"https://api.spotify.com/v1/"
})



export const setClientToken=(token)=>{
    apiClient.interceptors.request.use(async(config)=>{
        config.headers.Authorization="Bearer "+token
        return config
    })
}

export default apiClient