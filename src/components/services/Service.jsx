import axios from "axios";
const api = axios.create({
    baseURL : 'http://localhost:9090'
})

export const handleRegister = async(formData) => {
    let response = await api.post('/register/saveUser',formData)
    return response.data
    
}
  
export const handleLogin = async(formData)=>{
    console.log(formData);
    
    let response = await api.post('/register/login',formData)
    return response.data;   
}