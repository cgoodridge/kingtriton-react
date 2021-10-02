import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://us-central1-king-tritons-database.cloudfunctions.net/api'
    // 'http://localhost:5001/king-tritons-database/us-central1/api' // Cloud function URL
})

export default instance;