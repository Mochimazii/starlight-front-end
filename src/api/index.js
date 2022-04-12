import axios from 'axios'

let instance = axios.create({
    //baseURL:'http://localhost:8443/api/',
    //withCredentials:false,
});

// axios.interceptors.request.use(config => {
//     let token = sessionStorage.getItem("token")
//     console.log(token)
//     if(token) {
//         config.headers.Authorization = `${token}`
//         console.log(config)
//     }
//     return config
// })

export default instance
