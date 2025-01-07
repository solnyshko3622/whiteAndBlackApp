import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshAccessToken } from './refreshToken_api';

const API_ADDRESS = 'http://84.237.53.139:8080';

const getAccessToken = async () => {
    return await AsyncStorage.getItem('accessToken');
};

export const sendLike = async (itemId, entityType) => {
    try {
        let accessToken = await getAccessToken();

        const response = await axios.post(
            `${API_ADDRESS}/favorite/like`,
            {entityId: itemId, entityType: entityType },
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
            return sendLike(itemId);
        }

        throw error;
    }
};
