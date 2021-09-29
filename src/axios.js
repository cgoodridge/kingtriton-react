import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:5001/king-tritons-database/us-central1/api' // Cloud function URL
})

export default instance;