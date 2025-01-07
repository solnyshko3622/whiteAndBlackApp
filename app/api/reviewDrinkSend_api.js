import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshAccessToken } from './refreshToken_api';

const API_ADDRESS = 'http://84.237.53.139:8080';

const getAccessToken = async () => {
    return await AsyncStorage.getItem('accessToken');
};

export const sendDrinkReview = async (drinkId, review, score) => {
    try {
        let accessToken = await getAccessToken();

        const response = await axios.post(
            `${API_ADDRESS}/drink/review`,
            {drinkId: drinkId, review: review, score: score },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
            return sendDrinkReview(drinkId, review, score);
        }

        throw error;
    }
};
