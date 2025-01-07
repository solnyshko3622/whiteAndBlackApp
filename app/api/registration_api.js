import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = async (email, password, login) => {
    const response = await fetch('http://84.237.53.139:8080/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, login }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка регистрации');
    }

    const data = await response.json(); // Разбираем JSON один раз
    const { accessToken, refreshToken } = data;
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    return data;
};
