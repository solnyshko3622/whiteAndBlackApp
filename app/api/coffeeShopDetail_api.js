import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshAccessToken } from './refreshToken_api';

const API_ADDRESS = 'http://84.237.53.139:8080';

const getAccessToken = async () => {
    return await AsyncStorage.getItem('accessToken');
};

const setAccessToken = async (newToken) => {
    await AsyncStorage.setItem('accessToken', newToken);
};

export const getCafe = async (id) => {
    let refresh = await refreshAccessToken();
    try {
        let accessToken = await getAccessToken();

        let response = await axios.get(`${API_ADDRESS}/coffeeShop/fullInfo/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error.status);
        if (error.response?.status === 401) {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                return getCafe(id);
            }
        }
        throw error;
    }
};
