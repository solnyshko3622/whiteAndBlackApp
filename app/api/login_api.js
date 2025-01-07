import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async (login, password) => {
    const response = await fetch('http://84.237.53.139:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData);
        throw new Error(errorData.message || 'Ошибка входа');
    }

    const data = await response.json();

    const { accessToken, refreshToken } = data;
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    return data;
};
