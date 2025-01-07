import React, { useState } from 'react';
import { View, TextInput, Text, SafeAreaView } from 'react-native';
import { registerUser } from '../../api/registration_api';
import BlackButton from "../../components/button_component";
import styles from '../styles/registration_screen_styles'; // Импортируем стили

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [login, setLogin] = useState('');

    const handleRegister = async () => {
        setError('');
        if (!email || !password || !login) {
            setError('Все поля обязательны для заполнения');
            return;
        }
        try {
            await registerUser(email, password, login);
            navigation.replace('TabNavigator');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Регистрация</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Логин"
                value={login}
                onChangeText={setLogin}
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <BlackButton title="Зарегистрироваться" onPress={handleRegister} />
        </SafeAreaView>
    );
};

export default RegisterScreen;
