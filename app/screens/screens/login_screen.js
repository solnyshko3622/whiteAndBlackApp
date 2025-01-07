import React, { useState } from 'react';
import {TextInput, Button, Text, StyleSheet, SafeAreaView } from 'react-native';
import {loginUser} from "../../api/login_api";
import BlackButton from "../../components/button_component";

const LoginScreen = ({ navigation }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setError('');
        console.log("login")
        if (!login || !password) {
            setError('Введите логин и пароль');
            console.log("error")
            return;
        }
        try {
            await loginUser(login, password);
            navigation.navigate('TabNavigator');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Вход</Text>
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
        <BlackButton title="Войти" onPress={handleLogin} />
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF4E2',
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },

    title: {
        marginLeft: 20,
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFA729",
        textAlign: "center",
        marginBottom: 60,
    },
    input: {
        borderBottomWidth: 3,
        borderColor: '#885053',
        marginBottom: 10,
        padding: 8,
        paddingHorizontal: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    error: { color: 'red', marginBottom: 10 },
});

export default LoginScreen;
