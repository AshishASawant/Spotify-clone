import axios from 'axios'
const client_id = '693285c4d29b4fc99480403f400d2179'; // Your client id
const redirect_uri = 'http://localhost:3000'; // Your redirect uri
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