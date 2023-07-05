import axios from 'axios';

//BASE DA URL: https://api.themoviedb.org/3/
//URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=9f4bb8c9f952717709bfdb099b7d81dc

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;