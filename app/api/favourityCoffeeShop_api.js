import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshAccessToken } from './refreshToken_api';

const API_ADDRESS = 'http://84.237.53.139:8080';

const getAccessToken = async () => {
    return await AsyncStorage.getItem('accessToken');
};

export const getFavoriteCoffeeShops = async () => {
    try {
        const accessToken = await getAccessToken();
        if (!accessToken) {
            throw new Error('Access token not found');
        }
        const response = await axios.get(`${API_ADDRESS}/favorite/getFavoriteCoffeeShops`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                return getFavoriteCoffeeShops(); // Рекурсивно вызываем запрос с новым токеном
            }
        }
        throw error;
    }
};
