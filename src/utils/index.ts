import axios from 'axios';

const IMAGES_PER_PAGE = 20;

const axiosInstance =  axios.create({
	headers: { 
		'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true',
		'Content-Type': 'application/x-www-form-urlencoded' 
	},
	withCredentials: false, 
	baseURL: "https://api.unsplash.com" });

const searchPhoto = (query: string, page: number) =>{
    console.log("page", page);
    return axiosInstance.get(`/search/photos?query=${query}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`);
}
	
export { searchPhoto }