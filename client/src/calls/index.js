import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

export const useAxiosInterceptor = () => {
    const navigate = useNavigate();

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status === 401) {
                Cookies.remove('user');
                navigate('/login');
            }
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.request.use(
        (config) => {
            const token = Cookies.get('user');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

