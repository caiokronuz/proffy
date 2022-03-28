import axios from 'axios';

const api = axios.create({
    baseURL: 'https://proffyapi.herokuapp.com',
})

export default api;