import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const getRefreshToken = async () => {
    return await AsyncStorage.getItem('refreshToken');
};

const setRefreshToken = async (newToken) => {
    await AsyncStorage.setItem('refreshToken', newToken);
};

const getAccessToken = async () => {
    return await AsyncStorage.getItem('accessToken');
};

const setAccessToken = async (newToken) => {
    await AsyncStorage.setItem('accessToken', newToken);
};

export const refreshAccessToken = async () => {
    let refreshToken = await getRefreshToken();

    if (!refreshToken) {
        return null;
    }
    try {
        const response = await axios.post(
            'http://84.237.53.139:8080/auth/refresh',  // URL вашего API
            { refreshToken: refreshToken },  // Тело запроса
            {
                headers: {
                    'Authorization': `Bearer ${refreshToken}`,  // Заголовок авторизации
                    'Content-Type': 'application/json'  // Тип содержимого
                }
            }
        );

        await setAccessToken(response.data.accessToken);
    } catch (error) {
        return null
    }
};
